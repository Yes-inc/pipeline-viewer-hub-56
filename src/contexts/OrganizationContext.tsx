import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Organization } from "@/types/organization";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface OrganizationContextType {
  organization: Organization | null;
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType>({
  organization: null,
  isLoading: true,
});

export const OrganizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('organization_id')
          .single();

        if (profile?.organization_id) {
          const { data: org, error } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', profile.organization_id)
            .single();

          if (error) throw error;
          setOrganization(org);
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
        toast({
          title: "Error",
          description: "Failed to load organization data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [navigate]);

  return (
    <OrganizationContext.Provider value={{ organization, isLoading }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);