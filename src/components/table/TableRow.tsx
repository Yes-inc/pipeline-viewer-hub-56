import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink } from "lucide-react";
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
        <div className="flex items-center gap-3 pl-6">
          <Avatar>
            <AvatarImage src={row.Profile_Picture || ''} />
            <AvatarFallback>{row.Full_Name?.[0] || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-black">{row.Full_Name}</div>
            <div className="text-sm text-gray-500">{row.Company}</div>
            <a
              href={row.LinkedIn_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Visit Profile <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-black">{row.Email}</TableCell>
      <TableCell>
        {row.Company_Website && (
          <a
            href={row.Company_Website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Visit Website <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </TableCell>
      <TableCell className="text-black">{row.Deal_Size}</TableCell>
      <TableCell className="text-black">{row.Advisor}</TableCell>
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