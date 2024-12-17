import { Linkedin } from 'lucide-react';
import { Badge } from './ui/badge';

interface AdvisorPopupProps {
  name: string;
  location: string;
  picture: string | null;
  industry: string | null;
  duration: number | null;
  linkedIn: string | null;
}

const getDurationColor = (duration: number | null) => {
  if (duration === null) return 'bg-gray-500';
  if (duration === 0) return 'bg-blue-500';
  if (duration <= 3) return 'bg-green-500';
  if (duration <= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

const AdvisorPopup = ({ name, location, picture, industry, duration, linkedIn }: AdvisorPopupProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg min-w-[250px]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {picture ? (
            <img src={picture} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="font-medium truncate">{name}</div>
            {linkedIn && (
              <a 
                href={linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-2">{location}</div>
          <div className="flex flex-wrap gap-2">
            {industry && (
              <Badge variant="secondary" className="text-xs">
                {industry}
              </Badge>
            )}
            {duration !== null && (
              <Badge className={`text-xs ${getDurationColor(duration)}`}>
                {duration} {duration === 1 ? 'month' : 'months'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorPopup;