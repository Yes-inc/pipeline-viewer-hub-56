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
  bounds = [[-60, -180], [85, 180]],
  className = '' 
}, ref) => {
  return (
    <LeafletMapContainer
      ref={ref}
      bounds={bounds}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
      center={[20, 0]}
      zoom={2}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;