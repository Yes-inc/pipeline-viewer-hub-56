import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Advisor } from "../types/advisor";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AdvisorPopupProps {
  advisor: Advisor;
}

const AdvisorPopup = ({ advisor }: AdvisorPopupProps) => {
  const { data: leads = [] } = useQuery({
    queryKey: ['advisor-leads', advisor.Name],
    queryFn: async () => {
      if (!advisor.Name) return [];
      const { data, error } = await supabase
        .from('Mitigram_Leads')
        .select('*')
        .eq('Advisor', advisor.Name);
      if (error) throw error;
      return data;
    },
    enabled: !!advisor.Name
  });

  const totalPipeline = leads.reduce((sum, lead) => {
    const dealSize = typeof lead.Deal_Size === 'string' 
      ? parseInt(String(lead.Deal_Size).replace(/[^0-9]/g, ''), 10) || 0
      : Number(lead.Deal_Size) || 0;
    return sum + dealSize;
  }, 0);

  const formattedPipeline = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPipeline);

  return (
    <div className="min-w-[280px] p-1">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex items-center justify-center p-4 pb-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={advisor.Picture || ''}
              alt={advisor.Name || 'Advisor'}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {advisor.Name?.slice(0, 2).toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-2">
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-900">{advisor.Name || 'Unknown'}</h3>
            <p className="text-sm text-gray-600">{advisor.Industry || 'N/A'}</p>
          </div>
          <div className="space-y-1 text-sm border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium text-gray-900">{advisor.Duration || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pipeline:</span>
              <span className="font-medium text-gray-900">{formattedPipeline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Leads:</span>
              <span className="font-medium text-gray-900">{leads.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvisorPopup;