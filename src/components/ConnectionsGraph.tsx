import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConnectionsGraphProps {
  data: any[];
}

const ConnectionsGraph = ({ data }: ConnectionsGraphProps) => {
  // Process data to count connections by advisor
  const advisorCounts = data.reduce((acc: { [key: string]: number }, curr) => {
    const advisor = curr.advisor || 'Unassigned';
    acc[advisor] = (acc[advisor] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(advisorCounts).map(([advisor, count]) => ({
    advisor,
    connections: count
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Connections by Advisor</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="advisor" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="connections" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConnectionsGraph;