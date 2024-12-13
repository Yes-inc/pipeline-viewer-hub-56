import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { PipelineTable } from "../components/PipelineTable";
import ConnectionsGraph from "../components/ConnectionsGraph";
import { Users, Building2, UserCheck } from "lucide-react";

const Index = () => {
  const { data: connections = [], isLoading, error } = useQuery({
    queryKey: ['connections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Established-Connection')
        .select('*');
      
      if (error) throw error;
      
      return data.map((row, index) => ({
        id: index.toString(),
        name: row.Full_Name,
        jobTitle: '',
        company: row.Company,
        linkedinUrl: row.LinkedIn_URL,
        value: '',
        status: '',
        advisor: row.Advisor,
        lastContactedDate: '',
        initiatedContactDate: '',
        profilePicUrl: ''
      }));
    }
  });

  const uniqueAdvisors = new Set(connections.map(conn => conn.advisor).filter(Boolean)).size;
  const uniqueCompanies = new Set(connections.map(conn => conn.company).filter(Boolean)).size;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Total Connections"
            value={connections.length.toString()}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConnectionsGraph data={connections} />
        </div>

        <PipelineTable 
          title="Established Connections" 
          data={connections}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;