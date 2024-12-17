import { Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import AdvisorPopup from './AdvisorPopup';
import type { Advisor } from '../types/advisor';

interface AdvisorMarkerProps {
  advisor: Advisor;
  position: LatLngExpression;
}

const AdvisorMarker = ({ advisor, position }: AdvisorMarkerProps) => {
  return (
    <Marker position={position}>
      <Popup>
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