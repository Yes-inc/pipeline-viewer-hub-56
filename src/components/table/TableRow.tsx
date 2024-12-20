import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { type PipelineRow } from "../../utils/googleSheets";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentDialog } from "./CommentDialog";

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
  companyPrefix: "Mitigram" | "ToExceed";
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
  const commentsTable = `${companyPrefix}_Comments`;

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

  useEffect(() => {
    fetchComments();
  }, [row.LinkedIn_URL, companyPrefix]);

  return (
    <UITableRow 
      key={index}
      data-state={selectedRow === index ? "selected" : undefined}
      onClick={() => setSelectedRow(selectedRow === index ? null : index)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            {row.Profile_Picture ? (
              <AvatarImage src={row.Profile_Picture} alt={row.Full_Name || ""} />
            ) : (
              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </TableCell>
      <TableCell className="text-gray-900">{row.Full_Name}</TableCell>
      <TableCell className="text-gray-900">{row.Company}</TableCell>
      <TableCell>
        <a href={row.LinkedIn_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Profile
        </a>
      </TableCell>
      {(isEngagedProspects || isGeneratedLeads) && (
        <TableCell>
          <a href={row.Company_Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Website
          </a>
        </TableCell>
      )}
      <TableCell className="text-gray-900">{row.Advisor}</TableCell>
      <TableCell className="text-gray-900">{row.Deal_Size}</TableCell>
      <TableCell>
        <CommentDialog
          linkedinUrl={row.LinkedIn_URL}
          hasComments={hasComments}
          comments={comments}
          onCommentsUpdate={fetchComments}
          companyPrefix={companyPrefix}
        />
      </TableCell>
    </UITableRow>
  );
};