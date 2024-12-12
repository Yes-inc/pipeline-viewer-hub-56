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
import { useQuery } from "@tanstack/react-query";
import { fetchSheetData, type PipelineRow } from "../utils/googleSheets";
import { useToast } from "@/components/ui/use-toast";
import { prospects } from "../data/prospects";
import { PipelineTable } from "../components/PipelineTable";

const Index = () => {
  const { toast } = useToast();

  const samplePipelineData: PipelineRow[] = [
    {
      id: "001",
      name: "John Doe",
      company: "Acme Corporation",
      linkedinUrl: "https://linkedin.com/in/john-doe",
      value: "$250,000",
      status: "Contact Initiated"
    },
    {
      id: "002",
      name: "Jane Smith",
      company: "Global Industries",
      linkedinUrl: "https://linkedin.com/in/jane-smith",
      value: "$175,000",
      status: "New Lead"
    },
    {
      id: "003",
      name: "Mike Johnson",
      company: "Tech Solutions Inc",
      linkedinUrl: "https://linkedin.com/in/mike-johnson",
      value: "$420,000",
      status: "Contact Initiated"
    },
    {
      id: "004",
      name: "Sarah Wilson",
      company: "Digital Dynamics",
      linkedinUrl: "https://linkedin.com/in/sarah-wilson",
      value: "$150,000",
      status: "Negotiation"
    },
    {
      id: "005",
      name: "Tom Brown",
      company: "Future Systems",
      linkedinUrl: "https://linkedin.com/in/tom-brown",
      value: "$300,000",
      status: "Proposal"
    }
  ];

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
            <h2 className="text-xl font-semibold mb-4">Engaged Prospects</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prospect Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>LinkedIn URL</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prospects.map((prospect) => (
                  <TableRow key={prospect.id}>
                    <TableCell>{prospect.name}</TableCell>
                    <TableCell>{prospect.company}</TableCell>
                    <TableCell>
                      <a 
                        href={prospect.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {prospect.linkedinUrl}
                      </a>
                    </TableCell>
                    <TableCell>{prospect.value}</TableCell>
                    <TableCell>{prospect.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <PipelineTable title="Pipeline Details - Current Quarter" data={tableData} isLoading={isLoading} error={error} />
        <PipelineTable title="Pipeline Details - Next Quarter" data={tableData} isLoading={isLoading} error={error} />
      </div>
    </DashboardLayout>
  );
};

export default Index;