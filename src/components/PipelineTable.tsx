import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        <div className="relative">
          {/* Fixed Header */}
          <div className="sticky top-0 z-10 bg-white border-b">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900">Profile</TableHead>
                  <TableHead className="text-gray-900">Full Name</TableHead>
                  <TableHead className="text-gray-900">First Name</TableHead>
                  <TableHead className="text-gray-900">Last Name</TableHead>
                  <TableHead className="text-gray-900">Company</TableHead>
                  <TableHead className="text-gray-900">LinkedIn URL</TableHead>
                  <TableHead className="text-gray-900">Email</TableHead>
                  <TableHead className="text-gray-900">Advisor</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          
          {/* Scrollable Content */}
          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-900">Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-red-500">Error loading data</TableCell>
                  </TableRow>
                ) : visibleData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-900">No data available</TableCell>
                  </TableRow>
                ) : (
                  visibleData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
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
          </ScrollArea>
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