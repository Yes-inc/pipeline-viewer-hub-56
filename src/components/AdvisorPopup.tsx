import { Linkedin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Advisor } from '../types/advisor';

interface AdvisorPopupProps {
  advisor: Advisor;
}

const getDurationColor = (duration: number | null) => {
  if (duration === null) return 'bg-gray-500';
  if (duration === 0) return 'bg-blue-500';
  if (duration <= 3) return 'bg-green-500';
  if (duration <= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

const AdvisorPopup = ({ advisor }: AdvisorPopupProps) => {
  // Query for generated leads count and total pipeline
  const { data: leadsData } = useQuery({
    queryKey: ['advisor-leads', advisor.Name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Leads')
        .select('Deal_Size')
        .eq('Advisor', advisor.Name);
      
      if (error) throw error;
      
      const totalPipeline = data.reduce((sum, lead) => {
        const dealSize = lead.Deal_Size || '0';
        const numericValue = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
        return sum + numericValue;
      }, 0);

      return {
        count: data.length,
        pipeline: totalPipeline
      };
    }
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg min-w-[280px]">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-16 h-16 border-2 border-white shadow-md">
          {advisor.Picture ? (
            <AvatarImage src={advisor.Picture} alt={advisor.Name} />
          ) : (
            <AvatarFallback className="bg-primary text-white text-lg">
              {advisor.Name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{advisor.Name}</h3>
            {advisor.LinkedIn && (
              <a 
                href={advisor.LinkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-3">{advisor.Location}</div>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {advisor.Industry && (
              <Badge variant="secondary" className="text-xs">
                {advisor.Industry}
              </Badge>
            )}
            {advisor.Duration !== null && (
              <Badge className={`text-xs ${getDurationColor(advisor.Duration)}`}>
                {advisor.Duration} {advisor.Duration === 1 ? 'month' : 'months'}
              </Badge>
            )}
          </div>
          {leadsData && (
            <div className="text-sm">
              <div className="font-medium">Generated Leads: {leadsData.count}</div>
              <div className="text-green-600 font-medium">
                Pipeline: ${leadsData.pipeline.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorPopup;