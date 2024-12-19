import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import type { Advisor } from '../types/advisor';
import AdvisorPopup from './AdvisorPopup';

interface AdvisorMarkerProps {
  advisors: Advisor[];
  position: LatLngExpression;
}

const AdvisorMarker = ({ advisors, position }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createCustomIcon = () => {
    const count = advisors.length;
    const size = count > 99 ? 40 : count > 9 ? 35 : 30;
    const fontSize = count > 99 ? '14px' : '12px';
    
    const html = `
      <div class="flex items-center justify-center bg-indigo-600 text-white rounded-full border-2 border-white shadow-lg" 
           style="width: ${size}px; height: ${size}px; font-size: ${fontSize};">
        ${count}
      </div>
    `;
    
    return L.divIcon({
      html,
      className: '',
      iconSize: L.point(size, size),
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
            {advisors.map((advisor, index) => (
              <AdvisorPopup
                key={`${advisor.Name}-${index}`}
                advisor={advisor}
              />
            ))}
          </div>
        </Popup>
      )}
    </Marker>
  );
};

export default AdvisorMarker;