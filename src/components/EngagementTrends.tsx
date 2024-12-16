import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";
import { subDays, format } from 'date-fns';

interface EngagementTrendsProps {
  activeLeads: PipelineRow[];
  generatedLeads: PipelineRow[];
}

const EngagementTrends = ({ activeLeads, generatedLeads }: EngagementTrendsProps) => {
  // Generate daily data points for the last month
  const generateDailyData = () => {
    const data = [];
    for (let i = 30; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const formattedDate = format(date, 'MMM dd');
      
      // In a real application, you would filter leads by date
      // For now, we'll generate some sample data
      data.push({
        date: formattedDate,
        activeLeads: Math.floor(Math.random() * 10) + 1,
        generatedLeads: Math.floor(Math.random() * 8) + 1,
      });
    }
    return data;
  };

  const data = generateDailyData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Engagement Trends (Last 30 Days)</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={6}
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-semibold">{label}</p>
                      <p className="text-yellow-600">
                        Active Leads: {payload[0].value}
                      </p>
                      <p className="text-green-600">
                        Generated Leads: {payload[1].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="activeLeads" 
              stroke="#eab308" 
              name="Active Leads"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="generatedLeads" 
              stroke="#22c55e" 
              name="Generated Leads"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementTrends;