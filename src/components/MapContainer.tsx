import { MapContainer as LeafletMapContainer, TileLayer, MapContainerProps as LeafletMapContainerProps } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Advisor } from '@/types/advisor';
import AdvisorMarker from './AdvisorMarker';

interface MapContainerProps extends Omit<LeafletMapContainerProps, 'center' | 'zoom'> {
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
  ...props
}: MapContainerProps) => {
  return (
    <LeafletMapContainer
      className={className}
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
      {...props}
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