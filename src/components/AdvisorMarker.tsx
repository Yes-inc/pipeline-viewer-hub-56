import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorPopup from "./AdvisorPopup";

const locationCoordinates: { [key: string]: [number, number] } = {
  "Dubai": [25.2048, 55.2708],
  "Amsterdam": [52.3676, 4.9041],
  "Brazil": [-14.2350, -51.9253],
  "Portugal": [39.3999, -8.2245],
  "Bangladesh": [23.6850, 90.3563],
  "Namibia": [-22.9576, 18.4904],
  "Houston, Texas": [29.7604, -95.3698],
  "Boynton Beach, Florida, USA": [26.5317, -80.0905],
  "United States": [37.0902, -95.7129],
  "United States ": [37.0902, -95.7129], // Added with space to match exact string
};

const createCustomIcon = (imageUrl: string) => {
  return new L.DivIcon({
    html: `<div class="advisor-marker">
            <img src="${imageUrl}" class="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
          </div>`,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });
};

interface AdvisorMarkerProps {
  advisor: Advisor;
}

const AdvisorMarker = ({ advisor }: AdvisorMarkerProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  if (!advisor.Location || !locationCoordinates[advisor.Location]) {
    console.warn(`No coordinates found for location: ${advisor.Location}`);
    return null;
  }

  const coordinates = locationCoordinates[advisor.Location];
  const customIcon = createCustomIcon(advisor.Picture || "/placeholder.svg");

  return (
    <Marker 
      position={coordinates}
      icon={customIcon}
      eventHandlers={{
        click: () => setIsPopupOpen(true),
      }}
    >
      <Popup
        eventHandlers={{
          remove: () => setIsPopupOpen(false),
        }}
      >
        <AdvisorPopup advisor={advisor} />
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;