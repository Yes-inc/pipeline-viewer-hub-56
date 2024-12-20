import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MapContainer from "./MapContainer";
import AdvisorMarker from "./AdvisorMarker";
import { Advisor } from "@/types/advisor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdvisorsMapProps {
  companyPrefix: string | null;
}

const AdvisorsMap = ({ companyPrefix }: AdvisorsMapProps) => {
  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ['advisors', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
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
    },
    enabled: !!companyPrefix
  });

  if (isLoading || !advisors.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Advisor Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          {isLoading ? (
            <p>Loading advisors...</p>
          ) : (
            <p>No advisors found</p>
          )}
        </CardContent>
      </Card>
    );
  }

  const advisorsByLocation: { [key: string]: Advisor[] } = {};
  advisors.forEach(advisor => {
    if (advisor.Location) {
      if (!advisorsByLocation[advisor.Location]) {
        advisorsByLocation[advisor.Location] = [];
      }
      advisorsByLocation[advisor.Location].push(advisor);
    }
  });

  console.log('Advisors by location:', advisorsByLocation);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advisor Locations</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <MapContainer advisors={advisors} />
      </CardContent>
    </Card>
  );
};

export default AdvisorsMap;