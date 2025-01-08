import { useState } from "react";
import { toast } from "sonner";
import { Box } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import IntegrationButton from "../components/IntegrationButton";
import LoaderOverlay from "../components/LoaderOverlay";

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState<string | null>(null);

  const handleIntegration = (name: string) => {
    setCurrentIntegration(name);
    setIsLoading(true);
    
    const width = 600;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const url = name === "HubSpot" 
      ? "https://client-dashboard-444907.uc.r.appspot.com/hubspot/auth"
      : "https://client-dashboard-444907.uc.r.appspot.com/pipedrive/auth/pipedrive";

    const integrationWindow = window.open(
      url,
      `${name} Integration`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`
    );

    // Listen for success message from the integration window
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      const isSuccess = 
        (typeof data === 'object' && data?.status?.toLowerCase() === 'success') ||
        (typeof data === 'string' && data.toLowerCase().includes('oauth callback successful'));

      if (isSuccess) {
        // Store sync timestamp
        localStorage.setItem(
          `${name.toLowerCase()}_sync_time`, 
          new Date().toISOString()
        );
        setShowSuccess(true);
        toast.success(`${name} successfully synchronized`);
        integrationWindow?.close();
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);

    // Check if window is closed
    const checkWindow = setInterval(() => {
      if (integrationWindow?.closed) {
        clearInterval(checkWindow);
        setIsLoading(false);
        setShowSuccess(false);
        setCurrentIntegration(null);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  };

  return (
    <DashboardLayout>
      <LoaderOverlay loading={isLoading} success={showSuccess} />
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