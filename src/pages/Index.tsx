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

const Index = () => {
  const [rowsToShow, setRowsToShow] = useState(10);

  // Generate sample data for the table
  const generateTableData = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      client: `Client ${i + 1}`,
      value: `$${Math.floor(Math.random() * 100000)}`,
      status: ["In Progress", "Completed", "Pending"][Math.floor(Math.random() * 3)],
      lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    }));
  };

  const tableData = generateTableData(1000);

  const handleShowMore = () => {
    setRowsToShow(prev => Math.min(prev + 10, 1000));
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
                  {tableData.slice(0, rowsToShow).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.client}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            {rowsToShow < 1000 && (
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