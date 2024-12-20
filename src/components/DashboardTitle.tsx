import { Organization } from "@/types/organization";

interface DashboardTitleProps {
  organization: Organization | null;
}

const DashboardTitle = ({ organization }: DashboardTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      {organization?.logo_url && (
        <img
          src={organization.logo_url}
          alt={`${organization.name} logo`}
          className="h-8 w-auto"
        />
      )}
      <h1 className="text-2xl font-bold text-[#1A1F2C]">
        {organization?.name} Pipeline Dashboard
      </h1>
    </div>
  );
};

export default DashboardTitle;