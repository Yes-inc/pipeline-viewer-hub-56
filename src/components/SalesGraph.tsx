import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', introductions: 4 },
  { month: 'Feb', introductions: 7 },
  { month: 'Mar', introductions: 5 },
  { month: 'Apr', introductions: 10 },
  { month: 'May', introductions: 8 },
  { month: 'Jun', introductions: 12 }
];

const SalesGraph = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Sales Introductions</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="introductions" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesGraph;