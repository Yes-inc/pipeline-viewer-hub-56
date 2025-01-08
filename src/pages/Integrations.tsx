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
    window.addEventListener('message', (event) => {
      // Handle both simple message and structured message formats
      const isSuccess = 
        event.data === 'integration-success' || 
        (typeof event.data === 'object' && 
         event.data?.status?.toLowerCase() === 'success') ||
        (typeof event.data === 'string' && 
         event.data.toLowerCase().includes('oauth callback successful'));

      if (isSuccess) {
        setShowSuccess(true);
        // Store sync timestamp
        localStorage.setItem(
          `${name.toLowerCase()}_sync_time`, 
          new Date().toISOString()
        );
        toast.success(`${name} successfully synchronized`, {
          style: { background: '#22c55e', color: 'white' }
        });
        integrationWindow?.close();
      }
    });

    // Check if window is closed
    const checkWindow = setInterval(() => {
      if (integrationWindow?.closed) {
        clearInterval(checkWindow);
        setIsLoading(false);
        
        // Only show cancellation message if success state wasn't set
        if (!showSuccess) {
          toast.error(`${name} synchronization cancelled`, {
            style: { background: '#ef4444', color: 'white' }
          });
        }
        
        setShowSuccess(false);
        setCurrentIntegration(null);
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