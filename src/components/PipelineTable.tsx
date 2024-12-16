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

const shortenUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    return path.length > 15 ? `${path.substring(0, 15)}...` : path;
  } catch {
    return url.substring(0, 15) + '...';
  }
};

export const PipelineTable = ({ 
  title, 
  data = [], 
  isLoading = false, 
  error = null 
}: PipelineTableProps) => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  
  useEffect(() => {
    setRowsToShow(10);
  }, [data]);

  const handleShowMore = () => {
    setRowsToShow(prevRows => Math.min(prevRows + 10, data.length));
  };

  const visibleData = data?.slice(0, rowsToShow) || [];
  const hasMoreRows = rowsToShow < (data?.length || 0);
  const showEmail = title !== "Generated Leads";

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
        <div className="relative border rounded-md overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-50">
                <TableRow className="border-b">
                  <TableHead className="w-[70px] pl-4 text-gray-900">Profile</TableHead>
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">Full Name</TableHead>
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">Company</TableHead>
                  <TableHead className="min-w-[180px] pl-4 text-gray-900">LinkedIn URL</TableHead>
                  {showEmail && <TableHead className="min-w-[180px] pl-4 text-gray-900">Email</TableHead>}
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">Advisor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={showEmail ? 6 : 5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={showEmail ? 6 : 5} className="text-center text-red-500">Error loading data</TableCell>
                  </TableRow>
                ) : visibleData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showEmail ? 6 : 5} className="text-center">No data available</TableCell>
                  </TableRow>
                ) : (
                  visibleData.map((row, index) => (
                    <TableRow 
                      key={index}
                      onClick={() => setSelectedRow(index)}
                      data-state={selectedRow === index ? 'selected' : undefined}
                      className="cursor-pointer hover:bg-[#F1F0FB] data-[state=selected]:bg-[#E5DEFF]"
                    >
                      <TableCell className="pl-4">
                        <Avatar>
                          <AvatarImage src={row.profilePicUrl} alt={row.Full_Name || ''} />
                          <AvatarFallback>
                            <UserRound className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="pl-4 text-gray-900">{row.Full_Name}</TableCell>
                      <TableCell className="pl-4 text-gray-900">{row.Company}</TableCell>
                      <TableCell className="pl-4">
                        <a 
                          href={row.LinkedIn_URL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                          title={row.LinkedIn_URL}
                        >
                          {shortenUrl(row.LinkedIn_URL)}
                        </a>
                      </TableCell>
                      {showEmail && <TableCell className="pl-4 text-gray-900">{row.Email}</TableCell>}
                      <TableCell className="pl-4 text-gray-900">{row.Advisor}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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