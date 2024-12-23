import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { CompanyPrefix } from "@/types/supabase";

interface TableRowProps {
  row: PipelineRow;
  companyPrefix: CompanyPrefix;
}

const TableRow = ({ row, companyPrefix }: TableRowProps) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  return (
    <UITableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.Profile_Picture || ''} />
            <AvatarFallback>{row.Full_Name?.[0] || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{row.Full_Name}</div>
            <div className="text-sm text-gray-500">{row.Company}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-900">{row.Email}</TableCell>
      <TableCell className="text-gray-900">{row.Company_Website}</TableCell>
      <TableCell className="text-gray-900">{row.Deal_Size}</TableCell>
      <TableCell className="text-gray-900">{row.Advisor}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCommentDialogOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <CommentDialog
          isOpen={isCommentDialogOpen}
          onClose={() => setIsCommentDialogOpen(false)}
          leadLinkedInURL={row.LinkedIn_URL}
          companyPrefix={companyPrefix}
        />
      </TableCell>
    </UITableRow>
  );
};

export default TableRow;