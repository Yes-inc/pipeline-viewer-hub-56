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
        .from(`${companyPrefix}_Advisors` as "Mitigram_Advisors" | "ToExceed_Advisors" | "Gimi_Advisors")
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

  if (isLoading) {
    return (
      <Card className="bg-white shadow-none">
        <CardHeader className="bg-white">
          <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-900">Loading advisors...</p>
        </CardContent>
      </Card>
    );
  }

  if (!advisors?.length) {
    return (
      <Card className="bg-white shadow-none">
        <CardHeader className="bg-white">
          <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-900">No advisors found for {companyPrefix}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-none">
      <CardHeader className="bg-white">
        <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] bg-white">
        <MapContainer advisors={advisors} />
      </CardContent>
    </Card>
  );
};

export default AdvisorsMap;