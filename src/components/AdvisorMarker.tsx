import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import type { Advisor } from '../types/advisor';
import AdvisorPopup from './AdvisorPopup';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
  onMarkerClick: () => void;
  companyPrefix: "Mitigram" | "ToExceed";
}

const AdvisorMarker = ({ advisor, position, onMarkerClick, companyPrefix }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: white;
        border: 2px solid #4F46E5;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      ">
        ${advisor.Picture 
          ? `<img src="${advisor.Picture}" alt="${advisor.Name}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
        }
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          setIsOpen(true);
          onMarkerClick();
        },
      }}
      icon={customIcon}
    >
      {isOpen && (
        <Popup
          closeOnClick={false}
          eventHandlers={{
            remove: () => setIsOpen(false),
          }}
        >
          <div className="custom-popup">
            <AdvisorPopup advisors={[advisor]} companyPrefix={companyPrefix} />
          </div>
        </Popup>
      )}
    </Marker>
  );
};

export default AdvisorMarker;