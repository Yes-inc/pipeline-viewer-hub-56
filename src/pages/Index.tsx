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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    localStorage.setItem('GOOGLE_CLIENT_EMAIL', formData.get('clientEmail') as string);
    localStorage.setItem('GOOGLE_PRIVATE_KEY', formData.get('privateKey') as string);
    localStorage.setItem('GOOGLE_SHEET_ID', formData.get('sheetId') as string);
    
    toast({
      title: "Credentials saved",
      description: "Your Google Sheets credentials have been saved.",
    });
    
    setShowCredentialsForm(false);
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button 
            variant="outline"
            onClick={() => setShowCredentialsForm(!showCredentialsForm)}
          >
            Configure Google Sheets
          </Button>
        </div>

        {showCredentialsForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Google Sheets Configuration</h2>
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                  Client Email
                </label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  required
                  placeholder="your-service-account@project.iam.gserviceaccount.com"
                />
              </div>
              <div>
                <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700">
                  Private Key
                </label>
                <Input
                  id="privateKey"
                  name="privateKey"
                  type="text"
                  required
                  placeholder="-----BEGIN PRIVATE KEY-----\n..."
                />
              </div>
              <div>
                <label htmlFor="sheetId" className="block text-sm font-medium text-gray-700">
                  Sheet ID
                </label>
                <Input
                  id="sheetId"
                  name="sheetId"
                  type="text"
                  required
                  placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                />
              </div>
              <Button type="submit">Save Credentials</Button>
            </form>
          </div>
        )}

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
