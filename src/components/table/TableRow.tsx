import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { PipelineRow } from "@/utils/googleSheets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ExternalLink, ArrowRightFromLine } from "lucide-react";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { CompanyPrefix } from "@/types/supabase";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface TableRowProps {
  row: PipelineRow;
  companyPrefix: CompanyPrefix;
  isGeneratedLeads?: boolean;
}

const TableRow = ({ row, companyPrefix, isGeneratedLeads }: TableRowProps) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const { toast } = useToast();

  const formatDealSize = (dealSize: string | number | null | undefined) => {
    if (!dealSize) return '';
    
    let numericValue: number;
    
    if (typeof dealSize === 'string') {
      numericValue = parseInt(dealSize.replace(/[^0-9.-]/g, ''), 10);
    } else {
      numericValue = Number(dealSize);
    }
    
    if (!isNaN(numericValue)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericValue);
    }
    
    return '';
  };

  const getDealSize = (row: PipelineRow) => {
    return formatDealSize(row.Deal_Size || row.deal_size);
  };

  const formatDate = (timestamp: string | null | undefined) => {
    if (!timestamp) return '';
    try {
      return format(new Date(timestamp), 'yyyy-MM-dd');
    } catch {
      return '';
    }
  };

  const moveToUncertain = async () => {
    if (!companyPrefix || isMoving) return;
    
    setIsMoving(true);
    try {
      // Insert into uncertain leads
      const { error: insertError } = await supabase
        .from(`${companyPrefix}_Uncertain_Leads`)
        .insert([{
          Advisor: row.Advisor,
          LinkedIn_URL: row.LinkedIn_URL,
          Full_Name: row.Full_Name,
          First_Name: row.First_Name,
          Last_Name: row.Last_Name,
          Company: row.Company,
          Profile_Picture: row.Profile_Picture,
          Company_Website: row.Company_Website,
          Current_Title: row.Current_Title
        }]);

      if (insertError) throw insertError;

      // Delete from generated leads
      const { error: deleteError } = await supabase
        .from(`${companyPrefix}_Leads`)
        .delete()
        .eq('LinkedIn_URL', row.LinkedIn_URL);

      if (deleteError) throw deleteError;

      toast({
        title: "Lead Moved",
        description: "Successfully moved lead to unverified leads.",
      });

    } catch (error) {
      console.error('Error moving lead:', error);
      toast({
        title: "Error",
        description: "Failed to move lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMoving(false);
    }
  };

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
      <TableCell className="text-black">{row.Company}</TableCell>
      {!isGeneratedLeads && <TableCell className="text-black">{row.Email}</TableCell>}
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
      <TableCell className="text-black">{getDealSize(row)}</TableCell>
      <TableCell className="text-black">{row.Advisor}</TableCell>
      <TableCell className="text-black">{row.Current_Title || 'N/A'}</TableCell>
      <TableCell className="text-black">{formatDate(row.Time_Stamp)}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCommentDialogOpen(true)}
          className="hover:bg-transparent"
        >
          <MessageSquare className="h-4 w-4 text-gray-600" />
        </Button>
        {isGeneratedLeads && (
          <Button
            variant="ghost"
            size="icon"
            onClick={moveToUncertain}
            disabled={isMoving}
            className="hover:bg-transparent"
          >
            <ArrowRightFromLine className="h-4 w-4 text-gray-600" />
          </Button>
        )}
        <CommentDialog
          isOpen={isCommentDialogOpen}
          onClose={() => setIsCommentDialogOpen(false)}
          linkedinUrl={row.LinkedIn_URL}
          companyPrefix={companyPrefix}
        />
      </TableCell>
    </UITableRow>
  );
};

export default TableRow;