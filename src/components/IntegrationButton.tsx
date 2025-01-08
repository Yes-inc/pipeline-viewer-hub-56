import { useState, useEffect } from 'react';
import { LucideIcon, CheckCircle } from 'lucide-react';

interface IntegrationButtonProps {
  name: string;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
}

const IntegrationButton = ({ name, icon: Icon, description, onClick }: IntegrationButtonProps) => {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    // Check if there's a stored sync timestamp
    const syncTimestamp = localStorage.getItem(`${name.toLowerCase()}_sync_time`);
    if (syncTimestamp) {
      const syncTime = new Date(syncTimestamp).getTime();
      const currentTime = new Date().getTime();
      const oneHour = 60 * 60 * 1000; // one hour in milliseconds
      
      if (currentTime - syncTime < oneHour) {
        setIsSynced(true);
        // Set timeout to turn indicator gray after remaining time
        const remainingTime = oneHour - (currentTime - syncTime);
        setTimeout(() => {
          setIsSynced(false);
          localStorage.removeItem(`${name.toLowerCase()}_sync_time`);
        }, remainingTime);
      } else {
        localStorage.removeItem(`${name.toLowerCase()}_sync_time`);
      }
    }
  }, [name]);

  return (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left group animate-fade-up relative"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <CheckCircle 
          className={`w-5 h-5 transition-colors duration-300 ${
            isSynced ? 'text-success' : 'text-gray-300'
          }`} 
        />
      </div>
    </button>
  );
};

export default IntegrationButton;