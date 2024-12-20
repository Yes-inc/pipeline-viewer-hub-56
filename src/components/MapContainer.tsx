import { forwardRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorMarker from "./AdvisorMarker";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = forwardRef<HTMLDivElement, MapContainerProps>(({ advisors }, ref) => {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  return (
    <div ref={ref} className="h-full w-full">
      <LeafletMapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
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