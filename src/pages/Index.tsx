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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const { toast } = useToast();

  const prospects = [
    {
      id: 1,
      name: "Alice Johnson",
      company: "Tech Corp",
      value: "$50,000",
      status: "Active",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Bob Smith",
      company: "Innovation Ltd",
      value: "$75,000",
      status: "In Progress",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Carol Williams",
      company: "Future Systems",
      value: "$100,000",
      status: "New Lead",
      image: "/placeholder.svg"
    }
  ];

  const samplePipelineData: PipelineRow[] = [
    {
      id: "001",
      client: "Acme Corporation",
      value: "$250,000",
      status: "In Progress",
      lastUpdated: "2024-03-15"
    },
    {
      id: "002",
      client: "Global Industries",
      value: "$175,000",
      status: "New Lead",
      lastUpdated: "2024-03-14"
    },
    {
      id: "003",
      client: "Tech Solutions Inc",
      value: "$420,000",
      status: "Contract Sent",
      lastUpdated: "2024-03-13"
    },
    {
      id: "004",
      client: "Digital Dynamics",
      value: "$150,000",
      status: "Negotiation",
      lastUpdated: "2024-03-12"
    },
    {
      id: "005",
      client: "Future Systems",
      value: "$300,000",
      status: "Proposal",
      lastUpdated: "2024-03-11"
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

  const handleShowMore = () => {
    setRowsToShow(prev => Math.min(prev + 10, tableData.length));
  };

  const PipelineTable = ({ title }: { title: string }) => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
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
  );

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
            <h2 className="text-xl font-semibold mb-4">Sales Prospects</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prospects.map((prospect) => (
                  <TableRow key={prospect.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={prospect.image} alt={prospect.name} />
                        <AvatarFallback>{prospect.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{prospect.name}</TableCell>
                    <TableCell>{prospect.company}</TableCell>
                    <TableCell>{prospect.value}</TableCell>
                    <TableCell>{prospect.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <PipelineTable title="Pipeline Details - Current Quarter" />
        <PipelineTable title="Pipeline Details - Next Quarter" />
      </div>
    </DashboardLayout>
  );
};

export default Index;