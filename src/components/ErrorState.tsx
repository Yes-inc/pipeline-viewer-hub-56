import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  message: string;
}

const ErrorState = ({ title = "Error", message }: ErrorStateProps) => {
  return (
    <Alert variant="destructive" className="bg-white border-red-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorState;