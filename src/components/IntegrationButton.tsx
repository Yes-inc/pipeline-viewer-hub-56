import { LucideIcon } from 'lucide-react';

interface IntegrationButtonProps {
  name: string;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
}

const IntegrationButton = ({ name, icon: Icon, description, onClick }: IntegrationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left group animate-fade-up"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default IntegrationButton;