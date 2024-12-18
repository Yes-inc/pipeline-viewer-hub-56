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
    const domain = urlObj.hostname.replace('www.', '');
    return domain.length > 20 ? `${domain.substring(0, 20)}...` : domain;
  } catch {
    return url.length > 20 ? `${url.substring(0, 20)}...` : url;
  }
};

const formatCurrency = (value: string | null) => {
  if (!value) return '-';
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue || 0);
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
  const isEngagedProspects = title === "Engaged Prospects";
  const isGeneratedLeads = title === "Generated Leads";

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
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">LinkedIn URL</TableHead>
                  {(isEngagedProspects || isGeneratedLeads) && (
                    <TableHead className="min-w-[130px] pl-4 text-gray-900">Company Website</TableHead>
                  )}
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">Advisor</TableHead>
                  <TableHead className="min-w-[130px] pl-4 text-gray-900">Potential Pipeline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-red-500">Error loading data</TableCell>
                  </TableRow>
                ) : visibleData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No data available</TableCell>
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
                          <AvatarImage src={row.Profile_Picture} alt={row.Full_Name || ''} />
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
                      {(isEngagedProspects || isGeneratedLeads) && (
                        <TableCell className="pl-4">
                          {row.Company_Website && (
                            <a 
                              href={row.Company_Website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                              title={row.Company_Website}
                            >
                              {shortenUrl(row.Company_Website)}
                            </a>
                          )}
                        </TableCell>
                      )}
                      <TableCell className="pl-4 text-gray-900">{row.Advisor}</TableCell>
                      <TableCell className="pl-4 text-green-600 font-medium">
                        {formatCurrency(row.Deal_Size)}
                      </TableCell>
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
              className="px-4 py-2 bg-[#F1F0FB] text-gray-900 rounded-md hover:bg-[#E5DEFF] transition-colors"
            >
              Show More Rows
            </button>
          </div>
        )}
      </div>
    </div>
  );
};