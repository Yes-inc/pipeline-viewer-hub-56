import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import type { MapContainer as LeafletMap } from 'leaflet';
import { ReactNode, forwardRef } from 'react';

interface MapContainerProps {
  children: ReactNode;
}

const MapContainer = forwardRef<LeafletMap, MapContainerProps>(({ children }, ref) => {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <LeafletMapContainer
        ref={ref}
        className="h-full w-full"
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </LeafletMapContainer>
    </div>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;