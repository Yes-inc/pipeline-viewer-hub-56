import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 175000 },
  { month: 'Feb', value: 225000 },
  { month: 'Mar', value: 320000 },
  { month: 'Apr', value: 450000 },
  { month: 'May', value: 520000 },
  { month: 'Jun', value: 625000 }
];

const CombinedValueGraph = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Combined Pipeline Value Over Time</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Total Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CombinedValueGraph;