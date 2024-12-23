import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: React.ReactNode;
  className?: string;
  defaultCenter?: LatLngTuple;
  defaultZoom?: number;
}

const MapContainer = ({ 
  children, 
  className = "", 
  defaultCenter = [20, 0],
  defaultZoom = 2 
}: MapContainerProps) => {
  return (
    <LeafletMapContainer
      className={className}
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </LeafletMapContainer>
  );
};

export default MapContainer;