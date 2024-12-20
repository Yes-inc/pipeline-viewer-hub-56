import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Puzzle, CreditCard, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useOrganization } from "@/contexts/OrganizationContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organization } = useOrganization();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Pipeline Dashboard
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    isActive("/")
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  style={{
                    borderColor: isActive("/") ? (organization?.theme_color || '#6366f1') : undefined,
                    color: isActive("/") ? (organization?.theme_color || '#6366f1') : undefined
                  }}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/integrations"
                  className={`${
                    isActive("/integrations")
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  style={{
                    borderColor: isActive("/integrations") ? (organization?.theme_color || '#6366f1') : undefined,
                    color: isActive("/integrations") ? (organization?.theme_color || '#6366f1') : undefined
                  }}
                >
                  <Puzzle className="w-4 h-4 mr-2" />
                  Integrations
                </Link>
                <Link
                  to="/billing"
                  className={`${
                    isActive("/billing")
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  style={{
                    borderColor: isActive("/billing") ? (organization?.theme_color || '#6366f1') : undefined,
                    color: isActive("/billing") ? (organization?.theme_color || '#6366f1') : undefined
                  }}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;