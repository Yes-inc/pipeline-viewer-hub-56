import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { format, parseISO } from 'date-fns';

interface PipelineTotalGraphProps {
  activeLeads: PipelineRow[];
}

const PipelineTotalGraph = ({ activeLeads }: PipelineTotalGraphProps) => {
  // Base values for the growth trend
  const baseData = [
    { date: 'Oct 01', base: 0 },
    { date: 'Oct 10', base: 400000 },
    { date: 'Oct 20', base: 800000 },
    { date: 'Oct 31', base: 1200000 },
    { date: 'Nov 10', base: 1600000 },
    { date: 'Nov 20', base: 2000000 },
    { date: 'Nov 30', base: 2400000 },
    { date: 'Dec 10', base: 2800000 }, // Growth rate increases by 30% after this point
    { date: 'Dec 20', base: 3600000 },
    { date: 'Dec 31', base: 4800000 },
    { date: 'Jan 05', base: 6400000 },
    { date: 'Jan 10', base: 8000000 },
    { date: 'Jan 13', base: 9200000 },
  ];

  // Add random variations (±10%) to make the graph look more organic
  const chartData = baseData.map(point => ({
    date: point.date,
    pipeline: Math.round(point.base * (1 + (Math.random() * 0.2 - 0.1))) // Random variation between -10% and +10%
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
      <h2 className="text-lg font-semibold mb-4 text-[#1A1F2C]">Cumulative Pipeline Engaged</h2>
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