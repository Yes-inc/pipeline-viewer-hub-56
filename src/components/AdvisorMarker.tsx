import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { locationCoordinates } from '@/utils/locationData';

interface AdvisorMarkerProps {
  advisor: {
    Name?: string | null;
    Location?: string | null;
    Picture?: string | null;
    Industry?: string | null;
    Duration?: number | null;
    LinkedIn?: string | null;
  };
}

const AdvisorMarker = ({ advisor }: AdvisorMarkerProps) => {
  if (!advisor.Location) return null;

  const coordinates = locationCoordinates[advisor.Location];
  if (!coordinates) {
    console.warn(`No coordinates found for location: ${advisor.Location}`);
    return null;
  }

  const customIcon = new Icon({
    iconUrl: advisor.Picture || '/placeholder.svg',
    iconSize: [32, 32],
    className: 'rounded-full border-2 border-white shadow-lg',
  });

  return (
    <Marker 
      position={coordinates}
      icon={customIcon}
    >
      <Popup>
        <div className="flex flex-col items-center p-2">
          <img
            src={advisor.Picture || '/placeholder.svg'}
            alt={advisor.Name || 'Advisor'}
            className="w-16 h-16 rounded-full mb-2"
          />
          <h3 className="font-semibold">{advisor.Name}</h3>
          <p className="text-sm text-gray-600">{advisor.Location}</p>
          {advisor.Industry && (
            <p className="text-sm text-gray-600">{advisor.Industry}</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;