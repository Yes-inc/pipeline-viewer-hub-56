import { DollarSign, TrendingUp, ThumbsUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import InfoCard from "../components/InfoCard";
import { useQuery } from "@tanstack/react-query";
import { PipelineTable } from "../components/PipelineTable";
import { supabase } from "@/integrations/supabase/client";
import ConnectionsGraph from "../components/ConnectionsGraph";

const Index = () => {
  const { data: tableData = [], isLoading, error } = useQuery({
    queryKey: ['pipelineData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Established-Connection')
        .select('*');
      
      if (error) throw error;
      
      return data.map((row, index) => ({
        id: index.toString(),
        name: row.Full_Name,
        jobTitle: '', // Not in the current schema
        company: row.Company,
        linkedinUrl: row.LinkedIn_URL,
        value: '', // Not in the current schema
        status: '', // Not in the current schema
        advisor: row.Advisor,
        lastContactedDate: '', // Not in the current schema
        initiatedContactDate: '', // Not in the current schema
        profilePicUrl: '' // Not in the current schema
      }));
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="Total Connections"
            value={`${tableData?.length || 0}`}
            icon={DollarSign}
            trend="+12.5% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Active Advisors"
            value={Array.from(new Set(tableData?.map(d => d.advisor).filter(Boolean))).length.toString()}
            icon={ThumbsUp}
            trend="+25% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Companies Reached"
            value={Array.from(new Set(tableData?.map(d => d.company).filter(Boolean))).length.toString()}
            icon={TrendingUp}
            trend="+8.2% from last month"
            trendUp={true}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConnectionsGraph data={tableData} />
        </div>

        <PipelineTable 
          title="Established Connections" 
          data={tableData} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;