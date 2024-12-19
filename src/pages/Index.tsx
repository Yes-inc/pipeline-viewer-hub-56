import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { PipelineTable } from "../components/PipelineTable";
import { Users, TrendingUp, ArrowUpRight, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineRow } from "../utils/googleSheets";
import AdvisorsMap from "../components/AdvisorsMap";
import PipelineTotalGraph from "../components/PipelineTotalGraph";

const Index = () => {
  const { data: establishedConnections = [], isLoading: isLoadingEstablished, error: errorEstablished } = useQuery<PipelineRow[]>({
    queryKey: ['established-connections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Established-Connection')
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    }
  });

  const { data: activeLeads = [], isLoading: isLoadingActive, error: errorActive } = useQuery<PipelineRow[]>({
    queryKey: ['active-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('More-Active-Leads')
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    }
  });

  const { data: generatedLeads = [], isLoading: isLoadingGenerated, error: errorGenerated } = useQuery<PipelineRow[]>({
    queryKey: ['generated-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Leads')
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    }
  });

  const { data: uncertainLeads = [], isLoading: isLoadingUncertain, error: errorUncertain } = useQuery<PipelineRow[]>({
    queryKey: ['uncertain-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Uncertain Leads')
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    }
  });

  // Calculate metrics
  const totalEstablished = establishedConnections.length;
  const totalEngaged = activeLeads.length;
  const totalGenerated = generatedLeads.length;
  const totalPotentialPipeline = generatedLeads.reduce((sum, lead) => {
    const dealSize = lead.Deal_Size || '0';
    const numericValue = parseInt(dealSize.replace(/[^0-9]/g, ''), 10) || 0;
    return sum + numericValue;
  }, 0);

  // Format the total pipeline value
  const formattedPipeline = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPotentialPipeline);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Pipeline Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InfoCard
            title="Established Connections"
            value={totalEstablished.toString()}
            icon={Users}
            trend={`${totalEstablished} established connections`}
            trendUp={true}
          />
          <InfoCard
            title="Engaged Prospects"
            value={totalEngaged.toString()}
            icon={UserPlus}
            trend={`${totalEngaged} engaged prospects`}
            trendUp={true}
          />
          <InfoCard
            title="Generated Leads"
            value={totalGenerated.toString()}
            icon={ArrowUpRight}
            trend={`${totalGenerated} generated leads`}
            trendUp={true}
          />
          <InfoCard
            title="Total Potential Pipeline"
            value={formattedPipeline}
            icon={TrendingUp}
            trend="Total pipeline value"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvisorsMap />
          <PipelineTotalGraph generatedLeads={generatedLeads} />
        </div>

        <div className="space-y-8">
          <Tabs defaultValue="generated" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-gray-100/80 p-2 rounded-lg">
              <TabsTrigger 
                value="established" 
                className="flex-1 min-w-[120px] rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all text-sm py-2"
              >
                Established
              </TabsTrigger>
              <TabsTrigger 
                value="active"
                className="flex-1 min-w-[120px] rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all text-sm py-2"
              >
                Engaged
              </TabsTrigger>
              <TabsTrigger 
                value="generated"
                className="flex-1 min-w-[120px] rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all text-sm py-2"
              >
                Generated
              </TabsTrigger>
              <TabsTrigger 
                value="uncertain"
                className="flex-1 min-w-[120px] rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all text-sm py-2"
              >
                Unverified
              </TabsTrigger>
            </TabsList>
            <TabsContent value="established" className="mt-6">
              <PipelineTable 
                title="Established Connections" 
                data={establishedConnections}
                isLoading={isLoadingEstablished}
                error={errorEstablished}
              />
            </TabsContent>
            <TabsContent value="active" className="mt-6">
              <PipelineTable 
                title="Engaged Prospects" 
                data={activeLeads}
                isLoading={isLoadingActive}
                error={errorActive}
              />
            </TabsContent>
            <TabsContent value="generated" className="mt-6">
              <PipelineTable 
                title="Generated Leads" 
                data={generatedLeads}
                isLoading={isLoadingGenerated}
                error={errorGenerated}
              />
            </TabsContent>
            <TabsContent value="uncertain" className="mt-6">
              <PipelineTable 
                title="Unverified Leads" 
                data={uncertainLeads}
                isLoading={isLoadingUncertain}
                error={errorUncertain}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;