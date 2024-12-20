import { Table, TableBody } from "@/components/ui/table";
import { PipelineTableHeader } from "./table/TableHeader";
import { PipelineTableRow } from "./table/TableRow";
import { useState } from "react";
import type { PipelineRow } from "../utils/googleSheets";

interface PipelineTableProps {
  title: string;
  data: PipelineRow[];
  isLoading?: boolean;
  error?: Error | null;
  companyPrefix?: "Mitigram" | "ToExceed";
}

export const PipelineTable = ({ title, data, isLoading, error, companyPrefix = "Mitigram" }: PipelineTableProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const isEngagedProspects = title === "Engaged Prospects";
  const isGeneratedLeads = title === "Generated Leads";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1A1F2C]">{title}</h2>
      </div>
      <div className="border rounded-lg">
        <Table>
          <PipelineTableHeader
            isEngagedProspects={isEngagedProspects}
            isGeneratedLeads={isGeneratedLeads}
          />
          <TableBody>
            {data.map((row, index) => (
              <PipelineTableRow
                key={index}
                row={row}
                index={index}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                isEngagedProspects={isEngagedProspects}
                isGeneratedLeads={isGeneratedLeads}
                companyPrefix={companyPrefix}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};