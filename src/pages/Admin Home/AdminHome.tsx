
import RecentOrders from "../../features/admin/orders/components/RecentOrders";
import HomeActions from "./HomeActions";
import Statistics from "./Statistics";

export default function AdminHome() {

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Admin Dashboard
            </h1>
            <p className="text-sm text-textMain-light/70 dark:text-textMain-dark/70 mt-1">
              Welcome back! Here's an overview of PrimeStore performance.
            </p>
          </div>
        </div>

        <Statistics />

        <HomeActions />

        <RecentOrders />
      </div>
    </div>
  );
}
