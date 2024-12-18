import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { format } from 'date-fns';

interface PipelineTotalGraphProps {
  generatedLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ generatedLeads }: PipelineTotalGraphProps) => {
  // Process data to aggregate pipeline by date and calculate cumulative total
  const sortedLeads = [...generatedLeads].sort((a, b) => {
    if (!a.Timestamp || !b.Timestamp) return 0;
    const aDate = new Date((a.Timestamp as { created_at: string }).created_at);
    const bDate = new Date((b.Timestamp as { created_at: string }).created_at);
    return aDate.getTime() - bDate.getTime();
  });

  let cumulativeTotal = 0;
  const dailyPipelines = sortedLeads.reduce((acc: { [key: string]: number }, curr) => {
    if (!curr.Timestamp) return acc;
    const date = format(new Date((curr.Timestamp as { created_at: string }).created_at), 'MMM dd');
    const dealSize = curr.Deal_Size || '0';
    const numericValue = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
    cumulativeTotal += numericValue;
    acc[date] = cumulativeTotal;
    return acc;
  }, {});

  const chartData = Object.entries(dailyPipelines)
    .map(([date, pipeline]) => ({
      date,
      pipeline
    }));

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
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: "#1A1F2C" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 8, fill: "#1A1F2C" }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ backgroundColor: 'white', border: '1px solid #E5DEFF', color: '#1A1F2C' }}
            />
            <Line 
              type="monotone" 
              dataKey="pipeline" 
              stroke="#1e3a8a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineTotalGraph;