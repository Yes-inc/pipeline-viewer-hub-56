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
    
    // Avatar stack container
    const avatarStack = document.createElement('div');
    avatarStack.className = 'relative flex items-center justify-center mb-1';
    
    // Add avatars (limit to 3 visible avatars)
    advisors.slice(0, 3).forEach((advisor, index) => {
      const avatar = document.createElement('div');
      avatar.className = `w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white ${
        index > 0 ? 'absolute' : ''
      }`;
      
      // Position overlapping avatars
      if (index > 0) {
        avatar.style.transform = `translateX(${index * 20}px)`;
        avatar.style.zIndex = `${10 - index}`;
      }
      
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

    // Add count badge if there are more advisors
    if (advisors.length > 3) {
      const counter = document.createElement('div');
      counter.className = 'absolute -right-2 -top-2 w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white font-medium';
      counter.textContent = `+${advisors.length - 3}`;
      avatarStack.appendChild(counter);
    }
    
    container.appendChild(avatarStack);
    
    // Location info with black text
    const infoContainer = document.createElement('div');
    infoContainer.className = 'bg-white px-3 py-1.5 rounded-full shadow-lg text-center text-sm font-medium text-black';
    infoContainer.textContent = advisors[0].Location || 'Unknown';
    container.appendChild(infoContainer);
    
    iconHtml.appendChild(container);

    return L.divIcon({
      html: iconHtml.outerHTML,
      className: 'custom-advisor-marker',
      iconSize: L.point(120, 80),
      iconAnchor: L.point(60, 80),
    });
  };

  return (
    <Marker 
      position={position}
      icon={createCustomIcon()}
      eventHandlers={{
        click: () => setIsOpen(true),
      }}
    >
      <Popup
        // Remove className prop as it's not supported
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