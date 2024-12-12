import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DashboardLayout from "../components/DashboardLayout";

const Billing = () => {
  const handleSubscribe = () => {
    toast.info("Setting up subscription...");
    // Stripe integration will be implemented here
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Premium Plan</h3>
            <p className="text-gray-500">
              Get access to all premium features and unlimited pipeline tracking
            </p>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">$29</span>
              <span className="ml-1 text-gray-500">/month</span>
            </div>
            <Button onClick={handleSubscribe} className="w-full">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;