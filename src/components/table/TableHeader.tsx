import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Dispatch, SetStateAction } from "react";

interface TableHeaderProps {
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
  sortConfig: {
    key: keyof PipelineRow;
    direction: "asc" | "desc";
  } | null;
  onSort: Dispatch<SetStateAction<{
    key: keyof PipelineRow;
    direction: "asc" | "desc";
  } | null>>;
}

export const PipelineTableHeader = ({ 
  isEngagedProspects, 
  isGeneratedLeads,
  sortConfig,
  onSort 
}: TableHeaderProps) => {
  return (
    <TableHeader className="bg-white">
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
        <TableHead className="w-[150px] pl-4 pr-4 text-gray-900">Comments</TableHead>
      </TableRow>
    </TableHeader>
  );
};