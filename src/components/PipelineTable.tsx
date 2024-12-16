import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { type PipelineRow } from "../utils/googleSheets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

interface PipelineTableProps {
  title: string;
  data?: PipelineRow[];
  isLoading?: boolean;
  error?: Error | null;
}

export const PipelineTable = ({ 
  title, 
  data = [], 
  isLoading = false, 
  error = null 
}: PipelineTableProps) => {
  const [rowsToShow, setRowsToShow] = useState(10);
  
  useEffect(() => {
    setRowsToShow(10);
  }, [data]);

  const handleShowMore = () => {
    setRowsToShow(prevRows => Math.min(prevRows + 10, data.length));
  };

  const visibleData = data?.slice(0, rowsToShow) || [];
  const hasMoreRows = rowsToShow < (data?.length || 0);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
        <div className="relative rounded-md border">
          <div className="overflow-hidden" style={{ height: '400px' }}>
            <div className="overflow-auto" style={{ width: '100%', height: '100%' }}>
              <div style={{ minWidth: '1200px' }}>
                <Table>
                  <TableHeader className="sticky top-0 z-20 bg-white">
                    <TableRow>
                      <TableHead className="sticky left-0 z-30 bg-white w-[80px] text-gray-900">Profile</TableHead>
                      <TableHead className="min-w-[150px] text-gray-900">Full Name</TableHead>
                      <TableHead className="min-w-[150px] text-gray-900">First Name</TableHead>
                      <TableHead className="min-w-[150px] text-gray-900">Last Name</TableHead>
                      <TableHead className="min-w-[150px] text-gray-900">Company</TableHead>
                      <TableHead className="min-w-[200px] text-gray-900">LinkedIn URL</TableHead>
                      <TableHead className="min-w-[200px] text-gray-900">Email</TableHead>
                      <TableHead className="min-w-[150px] text-gray-900">Advisor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-red-500">Error loading data</TableCell>
                      </TableRow>
                    ) : visibleData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">No data available</TableCell>
                      </TableRow>
                    ) : (
                      visibleData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="sticky left-0 z-10 bg-white w-[80px]">
                            <Avatar>
                              <AvatarImage src={row.profilePicUrl} alt={row.Full_Name || ''} />
                              <AvatarFallback>
                                <UserRound className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="text-gray-900">{row.Full_Name}</TableCell>
                          <TableCell className="text-gray-900">{row.First_Name}</TableCell>
                          <TableCell className="text-gray-900">{row.Last_Name}</TableCell>
                          <TableCell className="text-gray-900">{row.Company}</TableCell>
                          <TableCell>
                            <a 
                              href={row.LinkedIn_URL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {row.LinkedIn_URL}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-900">{row.Email}</TableCell>
                          <TableCell className="text-gray-900">{row.Advisor}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        {hasMoreRows && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Show More Rows
            </button>
          </div>
        )}
      </div>
    </div>
  );
};