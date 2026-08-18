import { DollarSign, ShoppingBag, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios";

interface IDashboardStats {
  activeCoupons: number;
  totalConfirmedPrice: number;
  totalCoupons: number;
  totalOrders: number;
  totalUsers: number;
}
export default function Statistics() {
  const [statistics, setStatistics] = useState<IDashboardStats>({
    activeCoupons: 0,
    totalConfirmedPrice: 0,
    totalCoupons: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  useEffect(() => {
    const getStatistics = async () => {
      const response = await Axios.get("/admin/dashboard/statistics");
      setStatistics(response.data.data);
    };
    getStatistics();
  }, []);

  const statisticsList = [
    {
      title: "Total Revenue",
      statistic: statistics.totalConfirmedPrice,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      statistic: statistics.totalOrders,
      icon: ShoppingBag,
    },
    { title: "All Users", statistic: statistics.totalUsers, icon: Users },
    { title: "Coupons Used", statistic: statistics.totalCoupons, icon: Ticket },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statisticsList.map((sta) => {
        const Icon = sta.icon;
        return (
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase">
                {sta.title}
              </p>
              <h3 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mt-1">
                {sta.statistic}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-prime-light/40 dark:bg-bgMain-dark flex items-center justify-center text-prime dark:text-prime-darkTheme">
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
