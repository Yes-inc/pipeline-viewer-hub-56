import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Advisor } from '@/types/advisor';
import { findClosestLocation } from '@/utils/locationData';
import AdvisorMarker from './AdvisorMarker';

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = ({ advisors }: MapContainerProps) => {
  const defaultCenter: LatLngExpression = [20, 0];
  const defaultZoom = 2;

  const createCustomIcon = (advisor: Advisor): DivIcon => {
    return new DivIcon({
      className: 'custom-div-icon',
      html: `
        <div class="advisor-marker">
          <img 
            src="${advisor.Picture || '/placeholder.svg'}" 
            alt="${advisor.Name || 'Advisor'}"
            style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
          />
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div className="h-full w-full">
      <LeafletMapContainer
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attributionUrl='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {advisors.map((advisor) => {
          const position = findClosestLocation(advisor.Location || '');
          if (!position) return null;
          
          return (
            <AdvisorMarker
              key={advisor.LinkedIn}
              advisor={advisor}
              position={position}
              customIcon={createCustomIcon(advisor)}
            />
          );
        })}
      </LeafletMapContainer>
    </div>
  );
};

export default MapContainer;