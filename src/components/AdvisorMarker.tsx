import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import AdvisorPopup from './AdvisorPopup';
import type { Advisor } from '../types/advisor';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useState } from 'react';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
}

const AdvisorMarker = ({ advisor, position }: AdvisorMarkerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Create a custom div icon with the profile picture
  const createCustomIcon = () => {
    const iconHtml = document.createElement('div');
    iconHtml.className = 'advisor-marker-icon';
    
    const avatar = document.createElement('div');
    avatar.className = 'w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white';
    
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
    
    iconHtml.appendChild(avatar);

    return L.divIcon({
      html: iconHtml,
      className: 'custom-advisor-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="advisor-popup"
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