import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef } from "react";
import type { MapContainer as LeafletMap } from 'leaflet';
import { locationCoordinates } from '../utils/locationData';
import MapContainer from './MapContainer';
import AdvisorMarker from './AdvisorMarker';
import type { Advisor } from '../types/advisor';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface AdvisorsMapProps {
  companyPrefix: "Mitigram" | "ToExceed";
}

const AdvisorsMap = ({ companyPrefix }: AdvisorsMapProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  
  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ['advisors', companyPrefix],
    queryFn: async () => {
      console.log('Fetching advisors for:', companyPrefix);
      const { data, error } = await supabase
        .from(`${companyPrefix}_Advisors`)
        .select('*');
      if (error) {
        console.error('Error fetching advisors:', error);
        throw error;
      }
      console.log('Fetched advisors:', data);
      return data as Advisor[];
    }
  });

  if (isLoading) {
    return <div className="h-[400px] bg-white p-6 rounded-lg shadow-sm animate-pulse" />;
  }

  // Group advisors by location
  const advisorsByLocation = advisors.reduce((acc: { [key: string]: Advisor[] }, advisor) => {
    if (advisor.Location && locationCoordinates[advisor.Location]) {
      if (!acc[advisor.Location]) {
        acc[advisor.Location] = [];
      }
      acc[advisor.Location].push(advisor);
    }
    return acc;
  }, {});

  console.log('Advisors by location:', advisorsByLocation);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up space-y-4">
      <h2 className="text-lg font-semibold text-[#1A1F2C]">Advisors Locations</h2>
      <div className="h-[400px]">
        <MapContainer ref={mapRef}>
          {Object.entries(advisorsByLocation).map(([location, locationAdvisors]) => (
            <AdvisorMarker
              key={location}
              advisors={locationAdvisors}
              position={locationCoordinates[location]}
              companyPrefix={companyPrefix}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdvisorsMap;