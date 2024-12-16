import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { PipelineTable } from "../components/PipelineTable";
import { Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineRow } from "../utils/googleSheets";
import PipelineBarChart from "../components/PipelineBarChart";
import AdvisorsMap from "../components/AdvisorsMap";

const Index = () => {
  // Query for Established Connections
  const { data: establishedConnections = [], isLoading: isLoadingEstablished, error: errorEstablished } = useQuery<PipelineRow[]>({
    queryKey: ['established-connections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Established-Connection')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  // Query for More Active Leads
  const { data: activeLeads = [], isLoading: isLoadingActive, error: errorActive } = useQuery<PipelineRow[]>({
    queryKey: ['active-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('More-Active-Leads')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  // Query for Generated Leads 
  const { data: generatedLeads = [], isLoading: isLoadingGenerated, error: errorGenerated } = useQuery<PipelineRow[]>({
    queryKey: ['generated-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Leads')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  // Calculate metrics
  const totalEstablished = establishedConnections.length;
  const totalActive = activeLeads.length;
  const totalGenerated = generatedLeads.length;

  // Calculate conversion rates
  const activeConversionRate = totalEstablished > 0 
    ? ((totalActive / totalEstablished) * 100).toFixed(1) 
    : '0';
  const generatedConversionRate = totalActive > 0 
    ? ((totalGenerated / totalActive) * 100).toFixed(1) 
    : '0';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Pipeline Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Established Connections"
            value={totalEstablished.toString()}
            icon={Users}
            trend={`${totalEstablished} established connections`}
            trendUp={true}
          />
          <InfoCard
            title="Active Lead Conversion"
            value={`${activeConversionRate}%`}
            icon={TrendingUp}
            trend="From established connections"
            trendUp={true}
          />
          <InfoCard
            title="Generated Lead Conversion"
            value={`${generatedConversionRate}%`}
            icon={ArrowUpRight}
            trend="From active leads"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AdvisorsMap />
          <PipelineBarChart 
            establishedConnections={establishedConnections}
            activeLeads={activeLeads}
            generatedLeads={generatedLeads}
          />
        </div>

        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1 rounded-lg">
            <TabsTrigger 
              value="established" 
              className="rounded-md text-gray-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm transition-all"
            >
              Established Connections
            </TabsTrigger>
            <TabsTrigger 
              value="active"
              className="rounded-md text-gray-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm transition-all"
            >
              More Active Leads
            </TabsTrigger>
            <TabsTrigger 
              value="generated"
              className="rounded-md text-gray-900 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm transition-all"
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
              title="More Active Leads" 
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