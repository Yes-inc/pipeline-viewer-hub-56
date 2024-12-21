import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, ThumbsDown } from "lucide-react";
import { type PipelineRow } from "../../utils/googleSheets";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentDialog } from "./CommentDialog";
import { getCommentsTable } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Comment {
  id: string;
  comment: string;
  created_at: string;
}

interface PipelineTableRowProps {
  row: PipelineRow;
  index: number;
  selectedRow: number | null;
  setSelectedRow: (index: number | null) => void;
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
  companyPrefix: "Mitigram" | "ToExceed" | "Gimi";
}

export const PipelineTableRow = ({
  row,
  index,
  selectedRow,
  setSelectedRow,
  isEngagedProspects,
  isGeneratedLeads,
  companyPrefix,
}: PipelineTableRowProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasComments, setHasComments] = useState(false);
  const [isBadFit, setIsBadFit] = useState(false);
  const commentsTable = getCommentsTable(companyPrefix);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from(commentsTable)
        .select("*")
        .eq("lead_linkedin_url", row.LinkedIn_URL)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComments(data as Comment[]);
      setHasComments(data && data.length > 0);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkBadFitStatus = async () => {
    const { data } = await supabase
      .from('bad_fit_leads')
      .select('*')
      .eq('company_prefix', companyPrefix)
      .eq('linkedin_url', row.LinkedIn_URL)
      .single();
    
    setIsBadFit(!!data);
  };

  const handleMarkAsBadFit = async () => {
    try {
      const { error } = await supabase
        .from('bad_fit_leads')
        .insert({
          company_prefix: companyPrefix,
          linkedin_url: row.LinkedIn_URL
        });

      if (error) throw error;

      setIsBadFit(true);
      toast.success("Lead marked as bad fit");
    } catch (error) {
      console.error("Error marking as bad fit:", error);
      toast.error("Failed to mark lead as bad fit");
    }
  };

  useEffect(() => {
    fetchComments();
    checkBadFitStatus();
  }, [row.LinkedIn_URL, companyPrefix]);

  return (
    <UITableRow 
      key={index}
      data-state={selectedRow === index ? "selected" : undefined}
      onClick={() => setSelectedRow(selectedRow === index ? null : index)}
      className={`w-full ${isBadFit ? 'opacity-50' : ''}`}
    >
      <TableCell className="w-[70px] pl-4">
        <Avatar>
          {row.Profile_Picture ? (
            <AvatarImage src={row.Profile_Picture} alt={row.Full_Name || ""} />
          ) : (
            <AvatarFallback>
              <UserRound className="h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
      </TableCell>
      <TableCell className="min-w-[130px] pl-4 text-gray-900">{row.Full_Name}</TableCell>
      <TableCell className="min-w-[130px] pl-4 text-gray-900">{row.Company}</TableCell>
      <TableCell className="min-w-[130px] pl-4">
        <a href={row.LinkedIn_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Profile
        </a>
      </TableCell>
      {(isEngagedProspects || isGeneratedLeads) && (
        <TableCell className="min-w-[130px] pl-4">
          <a href={row.Company_Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Website
          </a>
        </TableCell>
      )}
      <TableCell className="min-w-[130px] pl-4 text-gray-900">{row.Advisor}</TableCell>
      <TableCell className="min-w-[130px] pl-4 text-gray-900">{row.Deal_Size}</TableCell>
      <TableCell className="w-[200px] pl-4 pr-4 flex items-center gap-2">
        <CommentDialog
          linkedinUrl={row.LinkedIn_URL}
          hasComments={hasComments}
          comments={comments}
          onCommentsUpdate={fetchComments}
          companyPrefix={companyPrefix}
        />
        {!isBadFit && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsBadFit();
            }}
          >
            <ThumbsDown className="h-4 w-4" />
            Bad Fit
          </Button>
        )}
      </TableCell>
    </UITableRow>
  );
};