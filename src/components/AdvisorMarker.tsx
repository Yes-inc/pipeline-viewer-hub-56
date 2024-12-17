import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import AdvisorPopup from './AdvisorPopup';
import type { Advisor } from '../types/advisor';
import { useState } from 'react';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
}

const AdvisorMarker = ({ advisor, position }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create a custom div icon with the profile picture and mini info
  const createCustomIcon = () => {
    const iconHtml = document.createElement('div');
    iconHtml.className = 'advisor-marker-icon';
    
    // Create container for avatar and info
    const container = document.createElement('div');
    container.className = 'flex flex-col items-center';
    
    // Only show the avatar when popup is not open
    if (!isOpen) {
      const avatar = document.createElement('div');
      avatar.className = 'w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white mb-1';
      
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
      container.appendChild(avatar);
    }
    
    // Mini info display
    const infoContainer = document.createElement('div');
    infoContainer.className = 'bg-white p-2 rounded-lg shadow-lg text-center min-w-[120px]';
    
    const name = document.createElement('div');
    name.className = 'font-semibold text-sm mb-1';
    name.textContent = advisor.Name;
    infoContainer.appendChild(name);
    
    if (advisor.Industry) {
      const industry = document.createElement('div');
      industry.className = 'text-xs bg-gray-100 rounded px-2 py-0.5 mb-1';
      industry.textContent = advisor.Industry;
      infoContainer.appendChild(industry);
    }
    
    if (advisor.Duration !== null) {
      const duration = document.createElement('div');
      duration.className = `text-xs ${getDurationColor(advisor.Duration)} text-white rounded px-2 py-0.5`;
      duration.textContent = `${advisor.Duration} ${advisor.Duration === 1 ? 'month' : 'months'}`;
      infoContainer.appendChild(duration);
    }
    
    container.appendChild(infoContainer);
    iconHtml.appendChild(container);

    return new L.DivIcon({
      html: iconHtml,
      className: 'custom-advisor-marker',
      iconSize: L.point(160, isOpen ? 80 : 140),
      iconAnchor: L.point(80, isOpen ? 40 : 140),
    });
  };

  const getDurationColor = (duration: number | null) => {
    if (duration === null) return 'bg-gray-500';
    if (duration === 0) return 'bg-blue-500';
    if (duration <= 3) return 'bg-green-500';
    if (duration <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
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
        className="advisor-popup"
        onClose={() => setIsOpen(false)}
      >
        <AdvisorPopup
          name={advisor.Name}
          location={advisor.Location!}
          picture={advisor.Picture}
          industry={advisor.Industry}
          duration={advisor.Duration}
          linkedIn={advisor.LinkedIn}
        />
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;