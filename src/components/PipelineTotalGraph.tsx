import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { format, parseISO } from 'date-fns';

interface PipelineTotalGraphProps {
  generatedLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ generatedLeads }: PipelineTotalGraphProps) => {
  // Process data to aggregate pipeline by date
  const dailyPipelines = generatedLeads.reduce((acc: { [key: string]: number }, curr) => {
    if (!curr.created_at) return acc;
    const date = format(parseISO(curr.created_at), 'MMM dd');
    acc[date] = (acc[date] || 0) + (curr.potential_pipeline || 0);
    return acc;
  }, {});

  const chartData = Object.entries(dailyPipelines)
    .map(([date, pipeline]) => ({
      date,
      pipeline
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
      <h2 className="text-lg font-semibold mb-4">Total Pipeline Over Time</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="pipeline" 
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              fill="url(#pipelineGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineTotalGraph;