import { DollarSign, TrendingUp, ThumbsUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import SalesGraph from "../components/SalesGraph";
import CombinedValueGraph from "../components/CombinedValueGraph";
import InfoCard from "../components/InfoCard";
import { useQuery } from "@tanstack/react-query";
import { type PipelineRow } from "../utils/googleSheets";
import { useToast } from "@/components/ui/use-toast";
import { prospects } from "../data/prospects";
import { PipelineTable } from "../components/PipelineTable";

const Index = () => {
  const { toast } = useToast();

  const { data: tableData = prospects, isLoading, error } = useQuery({
    queryKey: ['pipelineData'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/fetchGoogleSheets');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data as PipelineRow[];
      } catch (err) {
        console.error('Error fetching data:', err);
        toast({
          title: "Error fetching data",
          description: "There was an error fetching the pipeline data. Using sample data instead.",
          variant: "destructive",
        });
        return prospects;
      }
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
            title="Total Pipeline Value"
            value="$2.4M"
            icon={DollarSign}
            trend="+12.5% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Marketing Engagement"
            value="455 likes"
            icon={ThumbsUp}
            trend="+25% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Potential Pipeline Value"
            value="$4.8M"
            icon={TrendingUp}
            trend="+8.2% from last month"
            trendUp={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalesGraph />
          <CombinedValueGraph />
        </div>
        <PipelineTable 
          title="Pipeline Details - Current Quarter" 
          data={tableData} 
          isLoading={isLoading} 
          error={error} 
        />
        <PipelineTable 
          title="Pipeline Details - Next Quarter" 
          data={tableData} 
          isLoading={isLoading} 
          error={error} 
        />
        <PipelineTable 
          title="Pipeline Details - Future Quarter" 
          data={tableData} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;