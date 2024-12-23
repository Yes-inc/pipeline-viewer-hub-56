import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentDialog from "./CommentDialog";
import { CompanyPrefix, getCommentsTable } from "@/types/supabase";

interface TableRowProps {
  row: any;
  companyPrefix: CompanyPrefix;
}

const TableRow = ({ row, companyPrefix }: TableRowProps) => {
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
    <tr>
      <td>{row.First_Name} {row.Last_Name}</td>
      <td>{row.Company}</td>
      <td>{row.Email}</td>
      <td>
        <Button onClick={() => setIsCommentDialogOpen(true)}>
          <MessageCircle />
        </Button>
      </td>
      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
        leadLinkedInURL={row.LinkedIn_URL}
        companyPrefix={companyPrefix}
        comments={comments}
      />
    </tr>
  );
};

export default TableRow;
