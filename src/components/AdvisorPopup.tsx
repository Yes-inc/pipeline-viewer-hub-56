import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Advisor } from "../types/advisor";

interface AdvisorPopupProps {
  advisors: Advisor[];
  companyPrefix: "Mitigram" | "ToExceed";
}

const AdvisorPopup = ({ advisors, companyPrefix }: AdvisorPopupProps) => {
  const { data: leads = [] } = useQuery({
    queryKey: ['advisor-leads', companyPrefix, advisors.map(a => a.Name)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(`${companyPrefix}_Leads`)
        .select('*')
        .in('Advisor', advisors.map(a => a.Name));
      if (error) throw error;
      return data;
    }
  });

  const totalPipeline = leads.reduce((sum, lead) => {
    const dealSize = lead.Deal_Size || '0';
    const value = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
    return sum + value;
  }, 0);

  const formattedPipeline = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPipeline);

  return (
    <div className="p-2">
      {advisors.map((advisor) => (
        <div key={advisor.Name} className="mb-4 last:mb-0">
          <div className="flex items-center gap-3 mb-2">
            {advisor.Picture && (
              <img
                src={advisor.Picture}
                alt={advisor.Name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold">{advisor.Name}</h3>
              <p className="text-sm text-gray-600">{advisor.Industry}</p>
            </div>
          </div>
          <div className="text-sm">
            <p>Duration: {advisor.Duration} years</p>
            <p>Pipeline: {formattedPipeline}</p>
            <p>Leads: {leads.filter(l => l.Advisor === advisor.Name).length}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvisorPopup;