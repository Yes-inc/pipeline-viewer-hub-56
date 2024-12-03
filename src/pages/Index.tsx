import { DollarSign, TrendingUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import SalesGraph from "../components/SalesGraph";
import InfoCard from "../components/InfoCard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="Total Pipeline Value"
            value="$2.4M"
            icon={DollarSign}
            trend="+12.5% from last month"
            trendUp={true}
          />
          <InfoCard
            title="Potential Pipeline Value"
            value="$4.8M"
            icon={TrendingUp}
            trend="+8.2% from last month"
            trendUp={true}
          />
        </div>
        <SalesGraph />
      </div>
    </DashboardLayout>
  );
};

export default Index;