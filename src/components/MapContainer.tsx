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
      maxBounds={[[-90, -180], [90, 180]]} // Restrict map bounds
      maxBoundsViscosity={1.0} // Make the bounds "solid"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true} // Prevent infinite scrolling
      />
      {children}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;