import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import type { MapContainer as LeafletMap } from 'leaflet';
import { ReactNode, forwardRef } from 'react';
import type { MapContainerProps as LeafletMapProps } from 'react-leaflet';

interface MapContainerProps extends Omit<LeafletMapProps, 'children'> {
  children: ReactNode;
}

const MapContainer = forwardRef<LeafletMap, MapContainerProps>(({ children, ...props }, ref) => {
  return (
    <div className="h-[600px] rounded-lg overflow-hidden">
      <LeafletMapContainer
        ref={ref}
        className="h-full w-full"
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        {...props}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {children}
      </LeafletMapContainer>

      <style jsx global>{`
        .custom-advisor-marker {
          transition: transform 0.2s ease;
        }
        .custom-advisor-marker:hover {
          transform: scale(1.1);
          z-index: 1000 !important;
        }
        .advisor-popup .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
        }
        .advisor-popup .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;