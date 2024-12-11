import { DollarSign, TrendingUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import SalesGraph from "../components/SalesGraph";
import InfoCard from "../components/InfoCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { fetchSheetData, type PipelineRow } from "../utils/googleSheets";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const { toast } = useToast();

  const { data: tableData = [], isLoading, error } = useQuery({
    queryKey: ['pipelineData'],
    queryFn: async () => {
      // Replace these with your actual Google Sheet credentials and ID
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
        return [];
      }

      return fetchSheetData(credentials, sheetId);
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const handleShowMore = () => {
    setRowsToShow(prev => Math.min(prev + 10, tableData.length));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Total Pipeline Value"
            value="$2.4M"
            icon={DollarSign}
            trend="+12.5% from last month"
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
        <SalesGraph />
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pipeline Details</h2>
            <ScrollArea className="h-[400px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-red-500">Error loading data</TableCell>
                    </TableRow>
                  ) : (
                    tableData.slice(0, rowsToShow).map((row: PipelineRow) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.client}</TableCell>
                        <TableCell>{row.value}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.lastUpdated}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            {rowsToShow < tableData.length && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleShowMore}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Show More Rows
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;