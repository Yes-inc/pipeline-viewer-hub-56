import { toast } from "sonner";
import { Box } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import IntegrationButton from "../components/IntegrationButton";

const Integrations = () => {
  const handleIntegration = (name: string) => {
    toast.info(`Starting ${name} integration...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
        <div className="grid grid-cols-1 gap-6">
          <IntegrationButton
            name="HubSpot"
            icon={Box}
            description="Connect your HubSpot CRM to sync contacts and deals"
            onClick={() => handleIntegration("HubSpot")}
          />
          <IntegrationButton
            name="Pipedrive"
            icon={Box}
            description="Sync your Pipedrive pipeline and activities"
            onClick={() => handleIntegration("Pipedrive")}
          />
          <IntegrationButton
            name="Salesforce"
            icon={Box}
            description="Connect to Salesforce to sync your entire sales process"
            onClick={() => handleIntegration("Salesforce")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;