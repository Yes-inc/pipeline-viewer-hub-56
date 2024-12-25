import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression, DivIcon } from 'leaflet';
import { Advisor } from '@/types/advisor';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
  customIcon: DivIcon;
}

const AdvisorMarker = ({ advisor, position, customIcon }: AdvisorMarkerProps) => {
  return (
    <Marker 
      position={position} 
      icon={customIcon}
      key={advisor.LinkedIn}
    >
      <Popup>
        <div className="min-w-[240px] max-w-[280px] p-4 bg-white rounded-lg">
          <div className="flex items-center space-x-3">
            {advisor.Picture && (
              <img 
                src={advisor.Picture} 
                alt={advisor.Name || 'Advisor'} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{advisor.Name}</h3>
              <p className="text-sm text-gray-600 truncate">{advisor.Location}</p>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;