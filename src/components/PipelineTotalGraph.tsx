import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { format, parseISO } from 'date-fns';

interface PipelineTotalGraphProps {
  generatedLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ generatedLeads }: PipelineTotalGraphProps) => {
  // First, let's sort the leads by date
  const sortedLeads = [...generatedLeads].sort((a, b) => {
    const getDate = (lead: PipelineRow) => {
      const timestamp = lead.Timestamp?.created_at || lead.created_at;
      return timestamp ? new Date(timestamp) : new Date(0);
    };
    return getDate(a).getTime() - getDate(b).getTime();
  });

  // Create a map to store cumulative totals by date
  const dailyPipelines = new Map<string, number>();
  let runningTotal = 0;

  // Process each lead and calculate cumulative totals
  sortedLeads.forEach(lead => {
    const timestamp = lead.Timestamp?.created_at || lead.created_at;
    if (!timestamp) return;

    const date = format(new Date(timestamp), 'MMM dd');
    const dealSize = lead.Deal_Size || '0';
    const numericValue = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
    
    runningTotal += numericValue;
    dailyPipelines.set(date, runningTotal);
  });

  // Convert the map to an array of data points for the chart
  const chartData = Array.from(dailyPipelines.entries()).map(([date, total]) => ({
    date,
    pipeline: total
  }));

  console.log('Pipeline Chart Data:', chartData);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4 text-[#1A1F2C]">Cumulative Pipeline Generated</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: "#1A1F2C" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12, fill: "#1A1F2C" }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5DEFF', 
                color: '#1A1F2C',
                padding: '8px'
              }}
            />
            <defs>
              <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="pipeline" 
              stroke="#1e3a8a"
              fillOpacity={1}
              fill="url(#pipelineGradient)"
              dot={{ stroke: '#1e3a8a', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="pipeline" 
              stroke="#1e3a8a"
              strokeWidth={2}
              dot={{ stroke: '#1e3a8a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineTotalGraph;