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
    <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
      <TableRow>
        <TableHead className="w-[250px] text-black pl-6">Profile</TableHead>
        <TableHead className="text-black">Email</TableHead>
        <TableHead className="text-black">
          <span className="inline-block">Visit Website</span>
        </TableHead>
        <TableHead className="text-black">Deal Size</TableHead>
        <TableHead className="text-black">Advisor</TableHead>
        <TableHead className="w-[70px] text-black">Comments</TableHead>
      </TableRow>
    </TableHeader>
  );
};