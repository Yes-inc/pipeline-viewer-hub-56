import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableHeader from "./table/TableHeader";
import TableRow from "./table/TableRow";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { PipelineRow } from "@/utils/googleSheets";

interface PipelineTableProps {
  title: string;
  data: PipelineRow[];
  isLoading: boolean;
  error: Error | null;
  companyPrefix: "Mitigram" | "ToExceed" | "Gimi" | null;
}

export const PipelineTable = ({
  title,
  data,
  isLoading,
  error,
  companyPrefix,
}: PipelineTableProps) => {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  // Display count only for Mitigram Established Connections
  const displayTitle = companyPrefix === "Mitigram" && title === "Established Connections" 
    ? `${title} (${data.length})` 
    : title;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{displayTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <TableHeader />
          <div className="divide-y">
            {data.map((row, index) => (
              <TableRow key={index} row={row} companyPrefix={companyPrefix} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};