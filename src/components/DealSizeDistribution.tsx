import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";

interface DealSizeDistributionProps {
  generatedLeads: PipelineRow[];
}

const DealSizeDistribution = ({ generatedLeads }: DealSizeDistributionProps) => {
  // Group and aggregate deal sizes by company
  const dealsByCompany = generatedLeads.reduce((acc: { [key: string]: number }, lead) => {
    if (!lead.Company || !lead.Deal_Size) return acc;
    
    const dealSize = lead.Deal_Size || '0';
    const numericValue = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
    
    acc[lead.Company] = (acc[lead.Company] || 0) + numericValue;
    return acc;
  }, {});

  const data = Object.entries(dealsByCompany)
    .map(([company, value]) => ({
      company,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Show top 10 companies by deal size

  const colors = [
    '#0ea5e9', // sky-500
    '#0284c7', // sky-600
    '#0369a1', // sky-700
    '#075985', // sky-800
    '#0c4a6e', // sky-900
    '#1e40af', // blue-800
    '#1e3a8a', // blue-900
    '#312e81', // indigo-900
    '#3730a3', // indigo-800
    '#4338ca', // indigo-700
  ];

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
      <h2 className="text-lg font-semibold mb-4 text-[#1A1F2C]">Deal Size Distribution by Company</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={formatCurrency} />
            <YAxis 
              type="category" 
              dataKey="company" 
              tick={{ fontSize: 12 }}
              width={90}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Company: ${label}`}
              contentStyle={{ backgroundColor: 'white', border: '1px solid #E5DEFF' }}
            />
            <Bar dataKey="value" fill="#0ea5e9">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DealSizeDistribution;