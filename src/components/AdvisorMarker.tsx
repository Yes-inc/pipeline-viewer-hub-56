import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import AdvisorPopup from './AdvisorPopup';
import type { Advisor } from '../types/advisor';
import { useState } from 'react';

interface AdvisorMarkerProps {
  advisors: Advisor[];
  position: LatLngExpression;
}

const AdvisorMarker = ({ advisors, position }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createCustomIcon = () => {
    const iconHtml = document.createElement('div');
    iconHtml.className = 'advisor-marker-icon';
    
    const container = document.createElement('div');
    container.className = 'flex flex-col items-center';
    
    if (!isOpen) {
      if (advisors.length === 1) {
        // Single advisor avatar
        const avatar = document.createElement('div');
        avatar.className = 'w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white mb-1';
        
        if (advisors[0].Picture) {
          const img = document.createElement('img');
          img.src = advisors[0].Picture;
          img.className = 'w-full h-full object-cover';
          avatar.appendChild(img);
        } else {
          avatar.innerHTML = `<div class="w-full h-full bg-primary flex items-center justify-center text-white font-semibold">
            ${advisors[0].Name.charAt(0)}
          </div>`;
        }
        container.appendChild(avatar);
      } else {
        // Multiple advisors stack
        const avatarStack = document.createElement('div');
        avatarStack.className = 'relative flex items-center justify-center mb-1';
        
        advisors.slice(0, 2).forEach((advisor, index) => {
          const avatar = document.createElement('div');
          avatar.className = `w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white ${
            index === 1 ? 'relative -ml-4' : ''
          }`;
          
          if (advisor.Picture) {
            const img = document.createElement('img');
            img.src = advisor.Picture;
            img.className = 'w-full h-full object-cover';
            avatar.appendChild(img);
          } else {
            avatar.innerHTML = `<div class="w-full h-full bg-primary flex items-center justify-center text-white font-semibold">
              ${advisor.Name.charAt(0)}
            </div>`;
          }
          avatarStack.appendChild(avatar);
        });

        if (advisors.length > 2) {
          const counter = document.createElement('div');
          counter.className = 'w-8 h-8 rounded-full border-2 border-white shadow-lg bg-gray-100 -ml-4 flex items-center justify-center text-sm font-medium text-gray-600';
          counter.textContent = `+${advisors.length - 2}`;
          avatarStack.appendChild(counter);
        }
        
        container.appendChild(avatarStack);
      }
    }
    
    // Location info
    const infoContainer = document.createElement('div');
    infoContainer.className = 'bg-white p-2 rounded-lg shadow-lg text-center min-w-[120px]';
    
    const locationName = document.createElement('div');
    locationName.className = 'font-semibold text-sm mb-1';
    locationName.textContent = advisors[0].Location || 'Unknown';
    infoContainer.appendChild(locationName);
    
    const advisorCount = document.createElement('div');
    advisorCount.className = 'text-xs bg-gray-100 rounded px-2 py-0.5';
    advisorCount.textContent = `${advisors.length} ${advisors.length === 1 ? 'Advisor' : 'Advisors'}`;
    infoContainer.appendChild(advisorCount);
    
    container.appendChild(infoContainer);
    iconHtml.appendChild(container);

    return L.divIcon({
      html: iconHtml,
      className: 'custom-advisor-marker',
      iconSize: L.point(160, isOpen ? 80 : 140),
      iconAnchor: L.point(80, isOpen ? 40 : 140),
    });
  };

  return (
    <Marker 
      position={position}
      eventHandlers={{
        click: () => setIsOpen(true),
      }}
    >
      <Popup
        eventHandlers={{
          close: () => setIsOpen(false),
        }}
      >
        <div className="space-y-4">
          {advisors.map((advisor, index) => (
            <AdvisorPopup
              key={index}
              name={advisor.Name}
              location={advisor.Location!}
              picture={advisor.Picture}
              industry={advisor.Industry}
              duration={advisor.Duration}
              linkedIn={advisor.LinkedIn}
            />
          ))}
        </div>
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;