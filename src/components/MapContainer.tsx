import { forwardRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorMarker from "./AdvisorMarker";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = forwardRef<any, MapContainerProps>(({ advisors }, ref) => {
  // Default center coordinates (adjust as needed)
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  return (
    <LeafletMapContainer
      ref={ref}
      style={{ height: "100%", width: "100%" }}
      center={defaultCenter as [number, number]}
      zoom={defaultZoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {advisors.map((advisor, index) => (
        <AdvisorMarker key={index} advisor={advisor} />
      ))}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = "MapContainer";

export default MapContainer;