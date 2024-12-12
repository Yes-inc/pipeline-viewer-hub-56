import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
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

  const handleShowMore = () => {
    setRowsToShow(prev => Math.min(prev + 10, data.length));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-900">Profile</TableHead>
                <TableHead className="text-gray-900">Prospect Name</TableHead>
                <TableHead className="text-gray-900">Job Title</TableHead>
                <TableHead className="text-gray-900">Company</TableHead>
                <TableHead className="text-gray-900">LinkedIn URL</TableHead>
                <TableHead className="text-gray-900">Value</TableHead>
                <TableHead className="text-gray-900">Status</TableHead>
                <TableHead className="text-gray-900">Advisor</TableHead>
                <TableHead className="text-gray-900">Last Contacted</TableHead>
                <TableHead className="text-gray-900">Contact Initiated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-gray-900">Loading...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-red-500">Error loading data</TableCell>
                </TableRow>
              ) : (
                data.slice(0, rowsToShow).map((row: PipelineRow) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={row.profilePicUrl} alt={row.name} />
                        <AvatarFallback>
                          <UserRound className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-gray-900">{row.name}</TableCell>
                    <TableCell className="text-gray-900">{row.jobTitle}</TableCell>
                    <TableCell className="text-gray-900">{row.company}</TableCell>
                    <TableCell>
                      <a 
                        href={row.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {row.linkedinUrl}
                      </a>
                    </TableCell>
                    <TableCell className="text-gray-900">{row.value}</TableCell>
                    <TableCell className="text-gray-900">{row.status}</TableCell>
                    <TableCell className="text-gray-900">{row.advisor}</TableCell>
                    <TableCell className="text-gray-900">{row.lastContactedDate}</TableCell>
                    <TableCell className="text-gray-900">{row.initiatedContactDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        {rowsToShow < data.length && (
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
};