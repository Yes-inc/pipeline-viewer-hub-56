import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Organization } from "@/types/organization";

interface AdminDashboardSelectorProps {
  onOrganizationChange: (orgId: string) => void;
  currentOrganizationId: string | null;
}

const AdminDashboardSelector = ({ onOrganizationChange, currentOrganizationId }: AdminDashboardSelectorProps) => {
  const { data: organizations, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('*');
      if (error) throw error;
      return data as Organization[];
    }
  });

  if (isLoading) return null;

  return (
    <div className="mb-6">
      <Select
        value={currentOrganizationId || undefined}
        onValueChange={onOrganizationChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations?.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              <div className="flex items-center gap-2">
                {org.logo_url && (
                  <img
                    src={org.logo_url}
                    alt={`${org.name} logo`}
                    className="w-5 h-5 object-contain"
                  />
                )}
                <span>{org.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AdminDashboardSelector;