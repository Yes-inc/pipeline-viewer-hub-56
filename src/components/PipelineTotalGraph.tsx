import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";

interface PipelineTotalGraphProps {
  generatedLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ generatedLeads }: PipelineTotalGraphProps) => {
  // Process data to sum pipeline by advisor
  const advisorPipelines = generatedLeads.reduce((acc: { [key: string]: number }, curr) => {
    const advisor = curr.Advisor || 'Unassigned';
    acc[advisor] = (acc[advisor] || 0) + (curr.potential_pipeline || 0);
    return acc;
  }, {});

  const chartData = Object.entries(advisorPipelines).map(([advisor, pipeline]) => ({
    advisor,
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
      <h2 className="text-lg font-semibold mb-4">Total Pipeline by Advisor</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="advisor" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Advisor: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="pipeline" 
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#pipelineGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineTotalGraph;