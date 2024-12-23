import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import CommentDialog from "./CommentDialog";
import { useState } from "react";

interface TableRowProps {
  row: PipelineRow;
}

const TableRow = ({ row }: TableRowProps) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  return (
    <UITableRow className="text-[#1A1F2C]">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.Profile_Picture || ''} />
            <AvatarFallback>{row.Full_Name?.[0] || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.Full_Name}</div>
            <div className="text-sm text-[#8E9196]">{row.Company}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{row.Email}</TableCell>
      <TableCell>{row.Company_Website}</TableCell>
      <TableCell>{row.Deal_Size}</TableCell>
      <TableCell>{row.Advisor}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCommentDialogOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <CommentDialog
          open={isCommentDialogOpen}
          onOpenChange={setIsCommentDialogOpen}
          linkedinUrl={row.LinkedIn_URL}
        />
      </TableCell>
    </UITableRow>
  );
};

export default TableRow;