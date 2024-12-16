import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Advisor {
  Name: string;
  Location: string | null;
  Picture: string | null;
}

// Map of country/location names to their coordinates
const locationCoordinates: { [key: string]: L.LatLngExpression } = {
  'Portugal': [39.3999, -8.2245],
  'Bangladesh': [23.6850, 90.3563],
  'Brazil': [-14.2350, -51.9253]
};

const AdvisorsMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  
  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ['advisors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Advisors')
        .select('*');
      if (error) throw error;
      return data as Advisor[];
    }
  });

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Clear existing overlays
      map.eachLayer((layer) => {
        if (layer instanceof L.Popup) {
          map.removeLayer(layer);
        }
      });

      // Add card overlays for each advisor
      advisors
        .filter(advisor => advisor.Location && locationCoordinates[advisor.Location])
        .forEach((advisor) => {
          const position = locationCoordinates[advisor.Location!];
          const cardContent = `
            <div class="bg-white p-3 rounded-lg shadow-lg min-w-[200px]">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  ${advisor.Picture 
                    ? `<img src="${advisor.Picture}" alt="${advisor.Name}" class="w-full h-full object-cover" />`
                    : `<div class="w-full h-full flex items-center justify-center bg-primary text-white">${advisor.Name.charAt(0)}</div>`
                  }
                </div>
                <div>
                  <div class="font-medium">${advisor.Name}</div>
                  <div class="text-sm text-gray-500">${advisor.Location}</div>
                </div>
              </div>
            </div>
          `;

          L.popup({
            closeButton: false,
            closeOnClick: false,
            autoClose: false,
            className: 'custom-popup',
            offset: [0, -30]
          })
            .setLatLng(position as L.LatLngExpression)
            .setContent(cardContent)
            .addTo(map);
        });
    }
  }, [advisors, mapRef.current]);

  if (isLoading) {
    return <div className="h-[400px] bg-white p-6 rounded-lg shadow-sm animate-pulse" />;
  }

  // Center the map on Portugal as a default location
  const defaultCenter: L.LatLngExpression = [39.3999, -8.2245];

  // Filter out advisors without valid locations
  const validAdvisors = advisors.filter(advisor => 
    advisor.Location && locationCoordinates[advisor.Location]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Advisors Locations</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          ref={mapRef}
          className="h-full w-full"
          center={defaultCenter}
          zoom={2}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {validAdvisors.map((advisor, index) => {
            const position = locationCoordinates[advisor.Location!];
            return (
              <Marker key={index} position={position} />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdvisorsMap;