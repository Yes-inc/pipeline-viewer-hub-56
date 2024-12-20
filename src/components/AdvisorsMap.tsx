import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MapContainer from "./MapContainer";
import { Advisor } from "@/types/advisor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvisorTableNames } from "@/types/supabase";

interface AdvisorsMapProps {
  companyPrefix: string | null;
}

const AdvisorsMap = ({ companyPrefix }: AdvisorsMapProps) => {
  const { data: advisors = [], isLoading } = useQuery({
    queryKey: ['advisors', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
      console.log('Fetching advisors for:', companyPrefix);
      
      const tableName = `${companyPrefix}_Advisors` as AdvisorTableNames;
      const { data, error } = await supabase
        .from(tableName)
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
      <Card className="bg-white shadow-none border-0">
        <CardHeader className="bg-white border-0">
          <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border-0">
          <p className="text-gray-900">Loading advisors...</p>
        </CardContent>
      </Card>
    );
  }

  if (!advisors?.length) {
    return (
      <Card className="bg-white shadow-none border-0">
        <CardHeader className="bg-white border-0">
          <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border-0">
          <p className="text-gray-900">No advisors found for {companyPrefix}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-none border-0">
      <CardHeader className="bg-white border-0">
        <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] bg-white border-0">
        <MapContainer advisors={advisors} />
      </CardContent>
    </Card>
  );
};

export default AdvisorsMap;