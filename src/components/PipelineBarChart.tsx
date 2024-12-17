import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";

interface PipelineBarChartProps {
  establishedConnections: PipelineRow[];
  activeLeads: PipelineRow[];
  generatedLeads: PipelineRow[];
}

const PipelineBarChart = ({ establishedConnections, activeLeads, generatedLeads }: PipelineBarChartProps) => {
  const data = [
    {
      name: 'Established Connections',
      value: establishedConnections.length,
      fill: '#3b82f6' // Blue
    },
    {
      name: 'Engaged Prospects',
      value: activeLeads.length,
      fill: '#eab308' // Yellow
    },
    {
      name: 'Generated Leads',
      value: generatedLeads.length,
      fill: '#22c55e' // Green
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Pipeline Stage Overview</h2>
      <div className="h-[250px]"> {/* Reduced height from 400px to 250px */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineBarChart;