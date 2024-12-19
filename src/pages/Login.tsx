import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Check if user has an organization
        const { data: profile } = await supabase
          .from('profiles')
          .select('organization_id')
          .single();

        if (profile?.organization_id) {
          navigate("/");
        } else {
          // Handle users without organization (optional)
          console.error("User not associated with an organization");
          await supabase.auth.signOut();
        }
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/lovable-uploads/14960bfa-ea4b-4001-8a83-63355d968fad.png"
          alt="Yes.inc Logo"
          className="mx-auto h-24 w-auto mb-8"
        />
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Client Dashboard Login
        </h1>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#4f46e5',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;