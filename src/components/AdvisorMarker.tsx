import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import type { DivIcon } from 'leaflet';
import { Advisor } from '@/types/advisor';
import AdvisorPopup from './AdvisorPopup';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
  customIcon: DivIcon;
}

const AdvisorMarker = ({ advisor, position, customIcon }: AdvisorMarkerProps) => {
  return (
    <Marker 
      position={position} 
      icon={customIcon}
      key={advisor.LinkedIn}
    >
      <Popup>
        <AdvisorPopup advisor={advisor} />
      </Popup>
    </Marker>
  );
};

export default AdvisorMarker;