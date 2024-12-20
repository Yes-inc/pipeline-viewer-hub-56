import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { forwardRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import type { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: React.ReactNode;
  bounds?: LatLngBoundsExpression;
  className?: string;
  style?: React.CSSProperties;
}

const MapContainer = forwardRef<LeafletMap, MapContainerProps>(
  ({ children, bounds, className, style }, ref) => {
    return (
      <LeafletMapContainer
        ref={ref}
        bounds={bounds}
        className={className}
        style={style}
        zoom={2}
        center={[20, 0]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LeafletMapContainer>
    );
  }
);

MapContainer.displayName = 'MapContainer';

export default MapContainer;