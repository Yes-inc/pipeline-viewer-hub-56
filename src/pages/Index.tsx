import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { PipelineTable } from "../components/PipelineTable";
import { Users, TrendingUp, ArrowUpRight, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineRow } from "../utils/googleSheets";
import PipelineTotalGraph from "../components/PipelineTotalGraph";
import AdvisorsMap from "../components/AdvisorsMap";

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

        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1 rounded-lg">
            <TabsTrigger 
              value="established" 
              className="rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all"
            >
              Established Connections
            </TabsTrigger>
            <TabsTrigger 
              value="active"
              className="rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all"
            >
              Engaged Prospects
            </TabsTrigger>
            <TabsTrigger 
              value="generated"
              className="rounded-md text-[#1A1F2C] data-[state=active]:bg-white data-[state=active]:text-[#1A1F2C] data-[state=active]:shadow-sm transition-all"
            >
              Generated Leads
            </TabsTrigger>
          </TabsList>
          <TabsContent value="established">
            <PipelineTable 
              title="Established Connections" 
              data={establishedConnections}
              isLoading={isLoadingEstablished}
              error={errorEstablished}
            />
          </TabsContent>
          <TabsContent value="active">
            <PipelineTable 
              title="Engaged Prospects" 
              data={activeLeads}
              isLoading={isLoadingActive}
              error={errorActive}
            />
          </TabsContent>
          <TabsContent value="generated">
            <PipelineTable 
              title="Generated Leads" 
              data={generatedLeads}
              isLoading={isLoadingGenerated}
              error={errorGenerated}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;