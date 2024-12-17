import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngBounds, LatLngBoundsExpression } from 'leaflet';
import type { ReactNode } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  children: ReactNode;
  bounds?: LatLngBoundsExpression;
  className?: string;
}

const MapContainer = ({ children, bounds, className = '' }: MapContainerProps) => {
  const defaultBounds = new LatLngBounds([25, -130], [50, -65]); // USA bounds

  return (
    <LeafletMapContainer
      bounds={bounds || defaultBounds}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '300px' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </LeafletMapContainer>
  );
};

export default MapContainer;