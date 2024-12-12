import { DollarSign, TrendingUp, ThumbsUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import SalesGraph from "../components/SalesGraph";
import CombinedValueGraph from "../components/CombinedValueGraph";
import InfoCard from "../components/InfoCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSheetData, type PipelineRow } from "../utils/googleSheets";
import { useToast } from "@/components/ui/use-toast";
import { prospects } from "../data/prospects";
import { PipelineTable } from "../components/PipelineTable";

const Index = () => {
  const { toast } = useToast();

  const samplePipelineData: PipelineRow[] = prospects;

  const { data: tableData = samplePipelineData, isLoading, error } = useQuery({
    queryKey: ['pipelineData'],
    queryFn: async () => {
      const credentials = {
        client_email: localStorage.getItem('GOOGLE_CLIENT_EMAIL'),
        private_key: localStorage.getItem('GOOGLE_PRIVATE_KEY'),
      };
      const sheetId = localStorage.getItem('GOOGLE_SHEET_ID');

      if (!credentials.client_email || !credentials.private_key || !sheetId) {
        toast({
          title: "Missing Google Sheets Configuration",
          description: "Please set up your Google Sheets credentials in the settings.",
          variant: "destructive",
        });
        return samplePipelineData;
      }

      return fetchSheetData(credentials, sheetId);
    },
    refetchInterval: 5 * 60 * 1000,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
      </div>
    </DashboardLayout>
  );
};

export default Index;