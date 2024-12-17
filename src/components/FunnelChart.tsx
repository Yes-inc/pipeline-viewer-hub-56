import { ResponsiveContainer, FunnelChart as RechartsFunnel, Funnel, LabelList, Cell, Tooltip } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";

interface FunnelChartProps {
  establishedConnections: PipelineRow[];
  activeLeads: PipelineRow[];
  generatedLeads: PipelineRow[];
}

const FunnelChart = ({ establishedConnections, activeLeads, generatedLeads }: FunnelChartProps) => {
  const totalEstablished = establishedConnections.length;
  const totalActive = activeLeads.length;
  const totalGenerated = generatedLeads.length;

  // Calculate conversion rates
  const activeConversionRate = totalEstablished > 0 
    ? ((totalActive / totalEstablished) * 100).toFixed(1) 
    : '0';
  const generatedConversionRate = totalActive > 0 
    ? ((totalGenerated / totalActive) * 100).toFixed(1) 
    : '0';

  const data = [
    {
      name: 'Established Connections',
      value: totalEstablished,
      fill: '#3b82f6', // Blue
      conversion: '100%'
    },
    {
      name: 'Engaged Prospects',
      value: totalActive,
      fill: '#eab308', // Yellow
      conversion: `${activeConversionRate}%`
    },
    {
      name: 'Generated Leads',
      value: totalGenerated,
      fill: '#22c55e', // Green
      conversion: `${generatedConversionRate}%`
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Pipeline Conversion Funnel</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFunnel data={data}>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-semibold">{data.name}</p>
                      <p>Count: {data.value}</p>
                      <p>Conversion: {data.conversion}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Funnel
              dataKey="value"
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
              <LabelList
                position="right"
                fill="#374151"
                stroke="none"
                dataKey="name"
              />
              <LabelList
                position="right"
                fill="#374151"
                stroke="none"
                dataKey="conversion"
                offset={120}
              />
            </Funnel>
          </RechartsFunnel>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FunnelChart;