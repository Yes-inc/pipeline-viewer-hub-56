import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Advisor } from '@/types/advisor';
import AdvisorMarker from './AdvisorMarker';

interface MapContainerProps {
  advisors: Advisor[];
  className?: string;
  defaultCenter?: LatLngTuple;
  defaultZoom?: number;
}

const MapContainer = ({ 
  advisors,
  className = "",
  defaultCenter = [20, 0] as LatLngTuple,
  defaultZoom = 2,
}: MapContainerProps) => {
  return (
    <LeafletMapContainer
      className={`h-[400px] w-full ${className}`}
      center={defaultCenter as [number, number]}
      zoom={defaultZoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {advisors.map((advisor, index) => (
        <AdvisorMarker key={index} advisor={advisor} />
      ))}
    </LeafletMapContainer>
  );
};

export default MapContainer;