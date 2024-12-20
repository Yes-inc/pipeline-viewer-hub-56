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
        style={{ height: '100%', ...style }}
        defaultCenter={[20, 0]}
        defaultZoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </LeafletMapContainer>
    );
  }
);

MapContainer.displayName = 'MapContainer';

export default MapContainer;