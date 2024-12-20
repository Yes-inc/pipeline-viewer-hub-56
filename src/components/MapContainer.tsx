import { forwardRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorMarker from "./AdvisorMarker";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = forwardRef<HTMLDivElement, MapContainerProps>(({ advisors }, ref) => {
  const defaultCenter: LatLngTuple = [20, 0];
  
  return (
    <div ref={ref} className="h-full w-full">
      <LeafletMapContainer
        className="h-full w-full"
        center={defaultCenter as LatLngTuple}
        zoom={2}
        scrollWheelZoom={false}
        key={advisors.length}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {advisors.map((advisor, index) => (
          <AdvisorMarker key={`${advisor.Name}-${index}`} advisor={advisor} />
        ))}
      </LeafletMapContainer>
    </div>
  );
});

MapContainer.displayName = "MapContainer";

export default MapContainer;