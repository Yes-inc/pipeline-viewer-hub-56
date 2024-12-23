import { Table, TableBody } from "@/components/ui/table";
import { PipelineTableHeader } from "./table/TableHeader";
import TableRow from "./table/TableRow";
import { useState } from "react";
import type { PipelineRow } from "../utils/googleSheets";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

interface PipelineTableProps {
  title: string;
  data: PipelineRow[];
  isLoading?: boolean;
  error?: Error | null;
}

export const PipelineTable = ({ title, data, isLoading, error }: PipelineTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PipelineRow;
    direction: "asc" | "desc";
  } | null>(null);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1A1F2C]">{title}</h2>
      </div>
      <div className="border rounded-lg">
        <Table>
          <PipelineTableHeader
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />
          <TableBody className="text-[#1A1F2C]">
            {sortedData.map((row, index) => (
              <TableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};