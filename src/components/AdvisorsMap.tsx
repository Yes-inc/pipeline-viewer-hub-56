import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const AdvisorsMap = () => {
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

  if (isLoading) {
    return <div className="h-[400px] bg-white p-6 rounded-lg shadow-sm animate-pulse" />;
  }

  // Default center (can be adjusted based on advisor locations)
  const defaultCenter = [40.7128, -74.0060] as [number, number];

  // Filter out advisors without valid locations and parse coordinates
  const validAdvisors = advisors.filter(advisor => {
    if (!advisor.Location) return false;
    const [lat, lng] = advisor.Location.split(',').map(Number);
    return !isNaN(lat) && !isNaN(lng);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Advisor Locations</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          className="h-full w-full"
          center={defaultCenter}
          zoom={4}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {validAdvisors.map((advisor, index) => {
            const [lat, lng] = advisor.Location!.split(',').map(Number);
            
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div className="flex items-center space-x-3 p-2">
                    <Avatar>
                      <AvatarImage src={advisor.Picture || undefined} alt={advisor.Name} />
                      <AvatarFallback>{advisor.Name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{advisor.Name}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdvisorsMap;