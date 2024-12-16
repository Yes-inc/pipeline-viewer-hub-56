import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { PipelineTable } from "../components/PipelineTable";
import { Users, Building2, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CombinedValueGraph from "../components/CombinedValueGraph";
import { PipelineRow } from "../utils/googleSheets";

const Index = () => {
  // Query for Generated Leads 
  const { data: generatedLeads = [], isLoading: isLoadingGenerated, error: errorGenerated } = useQuery<PipelineRow[]>({
    queryKey: ['generated-leads'],
    queryFn: async () => {
      console.log('Starting to fetch generated leads...');
      
      const { data, error } = await supabase
        .from('Leads-Generated')
        .select('*');
      
      console.log('Generated leads response:', { data, error });
      
      if (error) {
        console.error('Error fetching generated leads:', error);
        throw error;
      }
      
      console.log('Successfully fetched generated leads:', data);
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

  // Calculate combined metrics
  const allConnections = [...establishedConnections, ...activeLeads, ...generatedLeads];
  const uniqueAdvisors = new Set(allConnections.map(conn => conn.Advisor).filter(Boolean)).size;
  const uniqueCompanies = new Set(allConnections.map(conn => conn.Company).filter(Boolean)).size;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Total Pipeline Size"
            value={allConnections.length.toString()}
            icon={Users}
            trend="+12.5% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Active Advisors"
            value={uniqueAdvisors.toString()}
            icon={UserCheck}
            trend="+25% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Companies Reached"
            value={uniqueCompanies.toString()}
            icon={Building2}
            trend="+8.2% from last month"
            trendUp={true}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <CombinedValueGraph data={allConnections} />
        </div>

        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generated">Generated Leads</TabsTrigger>
            <TabsTrigger value="active">More Active Leads</TabsTrigger>
            <TabsTrigger value="established">Established Connections</TabsTrigger>
          </TabsList>
          <TabsContent value="generated">
            <PipelineTable 
              title="Generated Leads" 
              data={generatedLeads}
              isLoading={isLoadingGenerated}
              error={errorGenerated}
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
          <TabsContent value="established">
            <PipelineTable 
              title="Established Connections" 
              data={establishedConnections}
              isLoading={isLoadingEstablished}
              error={errorEstablished}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;