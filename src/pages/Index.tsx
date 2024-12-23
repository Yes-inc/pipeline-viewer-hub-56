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
import { useEffect, useState } from "react";
import CompanySelector from "../components/CompanySelector";
import DashboardTitle from "../components/DashboardTitle";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Organization } from "@/types/organization";

const Index = () => {
  const [companyPrefix, setCompanyPrefix] = useState<"Mitigram" | "ToExceed" | "Gimi" | null>(null);
  const { organization } = useOrganization();
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch organization data based on company prefix
  const { data: selectedOrganization } = useQuery<Organization | null>({
    queryKey: ['organization', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return null;
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('name', companyPrefix)
        .single();
      
      if (error) {
        console.error('Error fetching organization:', error);
        return null;
      }
      return data;
    },
    enabled: !!companyPrefix
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('Type')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.Type === 'admin');
      }
    };
    checkAdminStatus();
  }, []);

  // For non-admin users, fetch their company
  useEffect(() => {
    const fetchUserCompany = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !isAdmin) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('Company')
          .eq('id', user.id)
          .single();
        
        if (profile?.Company === 'Mitigram') {
          setCompanyPrefix('Mitigram');
        } else if (profile?.Company === 'ToExceed') {
          setCompanyPrefix('ToExceed');
        } else if (profile?.Company === 'Gimi') {
          setCompanyPrefix('Gimi');
        }
      }
    };
    fetchUserCompany();
  }, [isAdmin]);

  const { data: establishedConnections = [], isLoading: isLoadingEstablished, error: errorEstablished } = useQuery<PipelineRow[]>({
    queryKey: ['established-connections', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
      const { data, error } = await supabase
        .from(`${companyPrefix}_Established_Connections`)
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    },
    enabled: !!companyPrefix
  });

  const { data: activeLeads = [], isLoading: isLoadingActive, error: errorActive } = useQuery<PipelineRow[]>({
    queryKey: ['active-leads', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
      const { data, error } = await supabase
        .from(`${companyPrefix}_Active_Leads`)
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    },
    enabled: !!companyPrefix
  });

  const { data: generatedLeads = [], isLoading: isLoadingGenerated, error: errorGenerated } = useQuery<PipelineRow[]>({
    queryKey: ['generated-leads', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
      const { data, error } = await supabase
        .from(`${companyPrefix}_Leads`)
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    },
    enabled: !!companyPrefix
  });

  const { data: uncertainLeads = [], isLoading: isLoadingUncertain, error: errorUncertain } = useQuery<PipelineRow[]>({
    queryKey: ['uncertain-leads', companyPrefix],
    queryFn: async () => {
      if (!companyPrefix) return [];
      const { data, error } = await supabase
        .from(`${companyPrefix}_Uncertain_Leads`)
        .select('*');
      if (error) throw error;
      return data as PipelineRow[];
    },
    enabled: !!companyPrefix
  });

  // Calculate metrics
  const totalEstablished = establishedConnections.length;
  const totalEngaged = activeLeads.length;
  const totalGenerated = generatedLeads.length;
  const totalPotentialPipeline = generatedLeads.reduce((sum, lead) => {
    if (!lead.Deal_Size) return sum;
    
    // Handle both string and number types for Deal_Size
    if (typeof lead.Deal_Size === 'string') {
      // For string values (e.g., "$500,000"), extract the number
      const numericValue = parseInt(lead.Deal_Size.replace(/[^0-9]/g, ''), 10) || 0;
      return sum + numericValue;
    } else if (typeof lead.Deal_Size === 'number') {
      // For number values (bigint), add directly
      return sum + lead.Deal_Size;
    }
    
    return sum;
  }, 0);

  // Format the total pipeline value
  const formattedPipeline = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPotentialPipeline);

  if (!companyPrefix && !isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading company information...</h2>
            <p className="text-gray-600">Please wait while we fetch your data.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isAdmin && (
          <CompanySelector
            onCompanyChange={(company) => setCompanyPrefix(company)}
            currentCompany={companyPrefix}
          />
        )}
        
        <div className="flex justify-between items-center">
          <DashboardTitle organization={selectedOrganization} />
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
          <AdvisorsMap companyPrefix={companyPrefix} />
          <PipelineTotalGraph generatedLeads={generatedLeads} />
        </div>

        <div className="space-y-12">
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
            <TabsContent value="established" className="mt-12">
              <PipelineTable 
                title="Established Connections" 
                data={establishedConnections}
                isLoading={isLoadingEstablished}
                error={errorEstablished}
              />
            </TabsContent>
            <TabsContent value="active" className="mt-12">
              <PipelineTable 
                title="Engaged Prospects" 
                data={activeLeads}
                isLoading={isLoadingActive}
                error={errorActive}
              />
            </TabsContent>
            <TabsContent value="generated" className="mt-12">
              <PipelineTable 
                title="Generated Leads" 
                data={generatedLeads}
                isLoading={isLoadingGenerated}
                error={errorGenerated}
              />
            </TabsContent>
            <TabsContent value="uncertain" className="mt-12">
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
