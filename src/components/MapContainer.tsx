import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { forwardRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: React.ReactNode;
  bounds?: L.LatLngBoundsExpression;
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
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LeafletMapContainer>
    );
  }
);

MapContainer.displayName = 'MapContainer';

export default MapContainer;