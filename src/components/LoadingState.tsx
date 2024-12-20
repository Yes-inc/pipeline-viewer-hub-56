import { Loader2 } from "lucide-react";

const LoadingState = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingState;