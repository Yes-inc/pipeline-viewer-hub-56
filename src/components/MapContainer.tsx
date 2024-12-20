import { forwardRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorMarker from "./AdvisorMarker";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  advisors: Advisor[];
}

const MapContainer = forwardRef<any, MapContainerProps>(({ advisors }, ref) => {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  return (
    <LeafletMapContainer
      ref={ref}
      className="h-full w-full"
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {advisors.map((advisor, index) => (
        <AdvisorMarker key={index} advisor={advisor} />
      ))}
    </LeafletMapContainer>
  );
});

MapContainer.displayName = "MapContainer";

export default MapContainer;