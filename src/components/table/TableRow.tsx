import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { type PipelineRow } from "../../utils/googleSheets";

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
    </UITableRow>
  );
};