import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import type { MapContainer as LeafletMap } from 'leaflet';
import { ReactNode, forwardRef } from 'react';
import type { MapContainerProps as LeafletMapProps } from 'react-leaflet';

interface MapContainerProps {
  children: ReactNode;
}

// Extend the props interface to include all necessary Leaflet props
interface ExtendedMapProps extends MapContainerProps, Omit<LeafletMapProps, 'children'> {}

const MapContainer = forwardRef<LeafletMap, MapContainerProps>(({ children }, ref) => {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <LeafletMapContainer
        ref={ref}
        className="h-full w-full"
        center={[20, 0] as [number, number]}
        zoom={2}
        scrollWheelZoom={false}
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]] as [[number, number], [number, number]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LeafletMapContainer>
    </div>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;