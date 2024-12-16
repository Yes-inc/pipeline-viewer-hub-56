import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
      setIsLoading(false);
    });
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;