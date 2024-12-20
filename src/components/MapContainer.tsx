import { forwardRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import type { ReactNode } from 'react';
import type { MapContainer as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: ReactNode;
  bounds?: LatLngBoundsExpression;
  className?: string;
}

const MapContainer = forwardRef<LeafletMap, MapContainerProps>(({ 
  children, 
  bounds = [[-60, -180], [85, 180]], // Expanded bounds for better visibility
  className = '' 
}, ref) => {
  return (
    <LeafletMapContainer
      ref={ref}
      bounds={bounds}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
      zoom={2}
      center={[20, 0]}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;