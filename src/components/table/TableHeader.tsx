import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Dispatch, SetStateAction } from "react";
import { Link } from "lucide-react";

interface TableHeaderProps {
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
  isUncertainLeads?: boolean;
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
  isUncertainLeads,
  sortConfig,
  onSort 
}: TableHeaderProps) => {
  return (
    <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
      <TableRow>
        <TableHead className="w-[200px] text-black pl-6">Profile</TableHead>
        <TableHead className="text-black">Company</TableHead>
        <TableHead className="text-black">
          <span className="inline-flex items-center gap-2">
            Company Website
            <Link className="h-4 w-4" />
          </span>
        </TableHead>
        <TableHead className="text-black">Deal Size</TableHead>
        <TableHead className="text-black">Advisor</TableHead>
        <TableHead className="text-black">Current Title</TableHead>
        <TableHead className="text-black">Date</TableHead>
        <TableHead className="w-[70px] text-black">Comments</TableHead>
      </TableRow>
    </TableHeader>
  );
};