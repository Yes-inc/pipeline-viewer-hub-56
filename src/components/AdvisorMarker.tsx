import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Advisor } from "@/types/advisor";
import AdvisorPopup from "./AdvisorPopup";
import { findClosestLocation } from "@/utils/locationData";

const createCustomIcon = (imageUrl: string) => {
  return L.divIcon({
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
  
  if (!advisor.Location) {
    console.warn(`No location provided for advisor: ${advisor.Name}`);
    return null;
  }

  const coordinates = findClosestLocation(advisor.Location);
  if (!coordinates) {
    return null;
  }

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