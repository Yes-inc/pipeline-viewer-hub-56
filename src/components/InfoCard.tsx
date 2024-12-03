import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const InfoCard = ({ title, value, icon: Icon, trend, trendUp }: InfoCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${trendUp ? 'text-success' : 'text-red-500'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;