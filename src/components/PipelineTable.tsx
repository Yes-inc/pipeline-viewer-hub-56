import { Table, TableBody } from "@/components/ui/table";
import { PipelineTableHeader } from "./table/TableHeader";
import TableRow from "./table/TableRow";
import { useState } from "react";
import type { PipelineRow } from "../utils/googleSheets";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import { CompanyPrefix } from "@/types/supabase";

interface PipelineTableProps {
  title: string;
  data: PipelineRow[];
  isLoading?: boolean;
  error?: Error | null;
  companyPrefix: CompanyPrefix;
}

export const PipelineTable = ({ 
  title, 
  data, 
  isLoading, 
  error,
  companyPrefix 
}: PipelineTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PipelineRow;
    direction: "asc" | "desc";
  } | null>(null);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  // Filter data based on the company prefix
  const filteredData = data.filter(row => {
    // If the row is from a company-specific table, it should match the current company prefix
    return row.LinkedIn_URL && row.LinkedIn_URL.length > 0;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const isGeneratedLeads = title.includes("Generated") || title.includes("Unverified");

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto relative">
          <Table>
            <PipelineTableHeader
              sortConfig={sortConfig}
              onSort={setSortConfig}
              isEngagedProspects={title.includes("Engaged")}
              isGeneratedLeads={isGeneratedLeads}
            />
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow 
                  key={index} 
                  row={row} 
                  companyPrefix={companyPrefix}
                  isGeneratedLeads={isGeneratedLeads}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};