import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { type PipelineRow } from "../utils/googleSheets";
import { PipelineTableHeader } from "./table/TableHeader";
import { PipelineTableRow } from "./table/TableRow";

interface PipelineTableProps {
  title: string;
  data?: PipelineRow[];
  isLoading?: boolean;
  error?: Error | null;
}

export const PipelineTable = ({ 
  title, 
  data = [], 
  isLoading = false, 
  error = null 
}: PipelineTableProps) => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  
  useEffect(() => {
    setRowsToShow(10);
  }, [data]);

  const handleShowMore = () => {
    setRowsToShow(prevRows => Math.min(prevRows + 10, data.length));
  };

  const visibleData = data?.slice(0, rowsToShow) || [];
  const hasMoreRows = rowsToShow < (data?.length || 0);
  const isEngagedProspects = title === "Engaged Prospects";
  const isGeneratedLeads = title === "Generated Leads";

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">{title}</h2>
        <div className="relative border rounded-md overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <PipelineTableHeader 
                isEngagedProspects={isEngagedProspects}
                isGeneratedLeads={isGeneratedLeads}
              />
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-[#1A1F2C]">Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-red-500">Error loading data</TableCell>
                  </TableRow>
                ) : visibleData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-[#1A1F2C]">No data available</TableCell>
                  </TableRow>
                ) : (
                  visibleData.map((row, index) => (
                    <PipelineTableRow
                      key={index}
                      row={row}
                      index={index}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      isEngagedProspects={isEngagedProspects}
                      isGeneratedLeads={isGeneratedLeads}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {hasMoreRows && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 bg-[#F1F0FB] text-[#1A1F2C] rounded-md hover:bg-[#E5DEFF] transition-colors"
            >
              Show More Rows
            </button>
          </div>
        )}
      </div>
    </div>
  );
};