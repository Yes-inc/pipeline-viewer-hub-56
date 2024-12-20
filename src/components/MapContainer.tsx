import { forwardRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorMarker from "./AdvisorMarker";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = forwardRef<HTMLDivElement, MapContainerProps>(({ advisors }, ref) => {
  return (
    <div ref={ref} className="h-full w-full">
      <LeafletMapContainer
        className="h-full w-full"
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {advisors.map((advisor, index) => (
          <AdvisorMarker key={index} advisor={advisor} />
        ))}
      </LeafletMapContainer>
    </div>
  );
});

MapContainer.displayName = "MapContainer";

export default MapContainer;