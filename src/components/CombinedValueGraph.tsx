import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CombinedValueGraphProps {
  data: any[];
}

const CombinedValueGraph = ({ data }: CombinedValueGraphProps) => {
  // Process data to count connections by advisor across all tables
  const advisorStats = data.reduce((acc: { [key: string]: any }, curr) => {
    const advisor = curr.advisor || 'Unassigned';
    if (!acc[advisor]) {
      acc[advisor] = {
        advisor,
        totalConnections: 0,
        companies: new Set(),
      };
    }
    acc[advisor].totalConnections += 1;
    if (curr.company) {
      acc[advisor].companies.add(curr.company);
    }
    return acc;
  }, {});

  const chartData = Object.values(advisorStats).map((stat: any) => ({
    advisor: stat.advisor,
    totalConnections: stat.totalConnections,
    uniqueCompanies: stat.companies.size,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Advisor Performance Overview</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="advisor" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="totalConnections" 
              name="Total Connections"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="uniqueCompanies" 
              name="Unique Companies"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CombinedValueGraph;