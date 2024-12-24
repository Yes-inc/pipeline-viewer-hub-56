import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactNode } from 'react';

interface MapContainerProps {
  children: ReactNode;
  className?: string;
  defaultCenter: [number, number];
  defaultZoom: number;
}

const MapContainer = ({ 
  children, 
  className = "", 
  defaultCenter = [0, 0],
  defaultZoom = 2 
}: MapContainerProps) => {
  return (
    <div className={className}>
      <LeafletMapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </LeafletMapContainer>
    </div>
  );
};

export default MapContainer;