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
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Prospect Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>LinkedIn URL</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Advisor</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead>Contact Initiated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">Loading...</TableCell>
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>{row.company}</TableCell>
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
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.advisor}</TableCell>
                    <TableCell>{row.lastContactedDate}</TableCell>
                    <TableCell>{row.initiatedContactDate}</TableCell>
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