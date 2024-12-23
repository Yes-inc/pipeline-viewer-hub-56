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
    <TableHeader>
      <TableRow>
        <TableHead className="w-[250px]">Profile</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Company Website</TableHead>
        <TableHead>Deal Size</TableHead>
        <TableHead>Advisor</TableHead>
        <TableHead className="w-[70px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};