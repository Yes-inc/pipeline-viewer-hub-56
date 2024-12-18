import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { format, parseISO } from 'date-fns';

interface PipelineTotalGraphProps {
  generatedLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ generatedLeads }: PipelineTotalGraphProps) => {
  // Create data points for the chart
  const dataPoints = generatedLeads
    .filter(lead => lead.Time_Stamp) // Filter out leads without timestamps
    .map(lead => {
      const timestamp = lead.Time_Stamp;
      const date = timestamp ? format(parseISO(timestamp), 'MMM dd') : '';
      const dealSize = lead.Deal_Size || '0';
      const value = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
      
      return {
        timestamp: timestamp,
        date,
        value
      };
    });

  // Sort data points by timestamp
  dataPoints.sort((a, b) => {
    if (!a.timestamp || !b.timestamp) return 0;
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  // Calculate cumulative totals
  let runningTotal = 0;
  const chartData = dataPoints.map(point => {
    runningTotal += point.value;
    return {
      date: point.date,
      pipeline: runningTotal
    };
  });

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
            margin={{ top: 5, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: "#1A1F2C" }}
              interval="preserveStartEnd"
              dy={10}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12, fill: "#1A1F2C" }}
              dx={-10}
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