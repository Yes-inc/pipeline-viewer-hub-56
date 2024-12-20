import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import type { Advisor } from '../types/advisor';
import AdvisorPopup from './AdvisorPopup';

interface AdvisorMarkerProps {
  advisors: Advisor[];
  position: LatLngExpression;
  companyPrefix: "Mitigram" | "ToExceed";
}

const AdvisorMarker = ({ advisors, position, companyPrefix }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createCustomIcon = () => {
    const advisor = advisors[0];
    const size = 40;
    
    const html = advisor.Picture 
      ? `
        <div class="flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
          <img 
            src="${advisor.Picture}" 
            alt="${advisor.Name}"
            class="w-full h-full rounded-full border-2 border-white shadow-lg object-cover"
          />
          ${advisors.length > 1 ? `
            <div class="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-md">
              +${advisors.length - 1}
            </div>
          ` : ''}
        </div>
      `
      : `
        <div class="flex items-center justify-center bg-indigo-600 text-white rounded-full border-2 border-white shadow-lg" 
             style="width: ${size}px; height: ${size}px; font-size: 14px;">
          ${advisors.length}
        </div>
      `;
    
    return L.divIcon({
      html,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  };

  return (
    <Marker 
      position={position}
      eventHandlers={{
        click: () => setIsOpen(true),
      }}
      icon={createCustomIcon()}
    >
      {isOpen && (
        <Popup
          onClose={() => setIsOpen(false)}
        >
          <div className="space-y-4">
            {advisors.map((advisor) => (
              <AdvisorPopup
                key={advisor.Name}
                advisors={[advisor]}
                companyPrefix={companyPrefix}
              />
            ))}
          </div>
        </Popup>
      )}
    </Marker>
  );
};

export default AdvisorMarker;