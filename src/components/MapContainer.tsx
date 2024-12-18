import { forwardRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import type { ReactNode } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: ReactNode;
  bounds?: LatLngBoundsExpression;
  className?: string;
}

const MapContainer = forwardRef<any, MapContainerProps>(({ 
  children, 
  bounds = [[0, -180], [75, -15]], // Expanded bounds for a more zoomed out view
  className = '' 
}, ref) => {
  return (
    <LeafletMapContainer
      ref={ref}
      bounds={bounds}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '300px' }}
      // Using bounds prop instead of maxBounds
      minZoom={2}
      maxZoom={18}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // Remove noWrap prop as it's not supported
      />
      {children}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;