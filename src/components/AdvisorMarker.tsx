import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Advisor } from '@/types/advisor';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
  customIcon: L.DivIcon;
}

const AdvisorMarker = ({ advisor, position, customIcon }: AdvisorMarkerProps) => {
  return (
    <Marker 
      position={position} 
      icon={customIcon}
    >
      <Popup>
        <div className="p-2">
          <div className="flex items-center space-x-3">
            {advisor.Picture && (
              <img 
                src={advisor.Picture} 
                alt={advisor.Name || 'Advisor'} 
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold">{advisor.Name}</h3>
              <p className="text-sm text-gray-600">{advisor.Location}</p>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;