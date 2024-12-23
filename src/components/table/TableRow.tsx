import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import CommentDialog from "./CommentDialog";
import { CompanyPrefix, getCommentsTable } from "@/types/supabase";
import type { PipelineRow } from "@/utils/googleSheets";

interface PipelineTableRowProps {
  row: PipelineRow;
  index: number;
  selectedRow: number | null;
  setSelectedRow: (index: number | null) => void;
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
  companyPrefix: CompanyPrefix;
}

export const PipelineTableRow = ({ 
  row, 
  index, 
  selectedRow, 
  setSelectedRow,
  isEngagedProspects,
  isGeneratedLeads,
  companyPrefix 
}: PipelineTableRowProps) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', companyPrefix, row.LinkedIn_URL],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(getCommentsTable(companyPrefix))
        .select('*')
        .eq('lead_linkedin_url', row.LinkedIn_URL)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!companyPrefix && !!row.LinkedIn_URL
  });

  return (
    <TableRow
      key={index}
      className={`cursor-pointer ${selectedRow === index ? 'bg-[#E5DEFF]' : ''}`}
      onClick={() => setSelectedRow(selectedRow === index ? null : index)}
    >
      <TableCell className="pl-4">
        {row.Profile_Picture ? (
          <img src={row.Profile_Picture} alt={row.Full_Name} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        )}
      </TableCell>
      <TableCell className="pl-4">{row.Full_Name}</TableCell>
      <TableCell className="pl-4">{row.Company}</TableCell>
      <TableCell className="pl-4">
        <a href={row.LinkedIn_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View Profile
        </a>
      </TableCell>
      {(isEngagedProspects || isGeneratedLeads) && (
        <TableCell className="pl-4">
          <a href={row.Company_Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Visit Website
          </a>
        </TableCell>
      )}
      <TableCell className="pl-4">{row.Advisor}</TableCell>
      <TableCell className="pl-4">{row.Deal_Size ? `$${row.Deal_Size.toLocaleString()}` : '-'}</TableCell>
      <TableCell className="pl-4 pr-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsCommentDialogOpen(true);
          }}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <CommentDialog
          isOpen={isCommentDialogOpen}
          onClose={() => setIsCommentDialogOpen(false)}
          leadLinkedInURL={row.LinkedIn_URL}
          companyPrefix={companyPrefix}
          comments={comments}
        />
      </TableCell>
    </TableRow>
  );
};