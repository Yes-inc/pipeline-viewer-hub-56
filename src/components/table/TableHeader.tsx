import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps {
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
}

export const PipelineTableHeader = ({ isEngagedProspects, isGeneratedLeads }: TableHeaderProps) => {
  return (
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
        <TableHead className="w-[70px] pl-4 text-gray-900">Comment</TableHead>
      </TableRow>
    </TableHeader>
  );
};