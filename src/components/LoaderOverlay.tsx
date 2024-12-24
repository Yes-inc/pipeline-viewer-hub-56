import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderOverlayProps {
  loading: boolean;
  success?: boolean;
}

const LoaderOverlay = ({ loading, success }: LoaderOverlayProps) => {
  if (!loading && !success) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={cn(
        "w-16 h-16 flex items-center justify-center rounded-full",
        success ? "bg-green-500" : "bg-white"
      )}>
        {loading ? (
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        ) : (
          <Check className="w-8 h-8 text-white animate-in zoom-in duration-300" />
        )}
      </div>
    </div>
  );
};

export default LoaderOverlay;