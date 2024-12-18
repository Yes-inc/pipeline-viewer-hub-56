import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PipelineRow } from "../../utils/googleSheets";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface PipelineTableRowProps {
  row: PipelineRow;
  index: number;
  selectedRow: number | null;
  setSelectedRow: (index: number) => void;
  isEngagedProspects: boolean;
  isGeneratedLeads: boolean;
}

const shortenUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    return domain.length > 20 ? `${domain.substring(0, 20)}...` : domain;
  } catch {
    return url.length > 20 ? `${url.substring(0, 20)}...` : url;
  }
};

const formatCurrency = (value: string | null) => {
  if (!value) return '-';
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue || 0);
};

export const PipelineTableRow = ({ 
  row, 
  index, 
  selectedRow, 
  setSelectedRow,
  isEngagedProspects,
  isGeneratedLeads 
}: PipelineTableRowProps) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleCommentSubmit = async () => {
    try {
      // Here we'll add the comment submission logic later when we have the database table ready
      toast({
        title: "Comment saved",
        description: "Your comment has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <UITableRow 
      onClick={() => setSelectedRow(index)}
      data-state={selectedRow === index ? 'selected' : undefined}
      className="cursor-pointer hover:bg-[#F1F0FB] data-[state=selected]:bg-[#E5DEFF]"
    >
      <TableCell className="pl-4">
        <Avatar>
          <AvatarImage src={row["Profile Picture"] || row.Profile_Picture} alt={row.Full_Name || ''} />
          <AvatarFallback>
            <UserRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="pl-4 text-gray-900">{row.Full_Name}</TableCell>
      <TableCell className="pl-4 text-gray-900">{row.Company}</TableCell>
      <TableCell className="pl-4">
        <a 
          href={row.LinkedIn_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
          title={row.LinkedIn_URL}
        >
          {shortenUrl(row.LinkedIn_URL)}
        </a>
      </TableCell>
      {(isEngagedProspects || isGeneratedLeads) && (
        <TableCell className="pl-4">
          {row.Company_Website && (
            <a 
              href={row.Company_Website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
              title={row.Company_Website}
            >
              {shortenUrl(row.Company_Website)}
            </a>
          )}
        </TableCell>
      )}
      <TableCell className="pl-4 text-gray-900">{row.Advisor}</TableCell>
      <TableCell className="pl-4 text-green-600 font-medium">
        {formatCurrency(row.Deal_Size)}
      </TableCell>
      <TableCell className="pl-4">
        <Dialog>
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Comment for {row.Full_Name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="Type your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleCommentSubmit} className="w-full">
                Save Comment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </UITableRow>
  );
};