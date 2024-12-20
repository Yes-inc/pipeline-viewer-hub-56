import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MapContainer from "./MapContainer";
import { Advisor } from "@/types/advisor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvisorTableNames } from "@/types/supabase";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface AdvisorsMapProps {
  companyPrefix: string | null;
}

const AdvisorsMap = ({ companyPrefix }: AdvisorsMapProps) => {
  const { data: advisors = [], isLoading, error } = useQuery({
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
    enabled: !!companyPrefix,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2,
    retryDelay: 1000
  });

  return (
    <Card className="bg-white shadow-none border-0">
      <CardHeader className="bg-white border-0">
        <CardTitle className="text-gray-900">Advisor Locations</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] bg-white border-0">
        {isLoading ? (
          <LoadingState message="Loading advisor locations..." />
        ) : error ? (
          <ErrorState 
            title="Failed to load advisors" 
            message="There was an error loading the advisor data. Please try again later." 
          />
        ) : !advisors?.length ? (
          <div className="flex items-center justify-center h-full bg-white">
            <p className="text-gray-600">No advisors found for {companyPrefix}</p>
          </div>
        ) : (
          <MapContainer advisors={advisors} />
        )}
      </CardContent>
    </Card>
  );
};

export default AdvisorsMap;