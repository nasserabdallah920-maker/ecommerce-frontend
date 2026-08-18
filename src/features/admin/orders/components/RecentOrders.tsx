import { useEffect } from "react";

import { formatDate } from "../../../../utils/formatDate";
import { useOrdersManagement } from "../hooks/useOrdersManagement";
import { Link } from "react-router-dom";
import Loading from "../../../../components/shared/loading";

export default function RecentOrders() {
  const { getAllOrders, orders,loading } = useOrdersManagement();
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);
  if(loading)return <Loading/>
  const location = window.location.pathname;
  const ordersShow = location == "/admin" ? orders?.slice(0, 4) : orders;
  const statusStyles = {
    pending:
      "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/40",
    confirmed:
      "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/40",
    processing:
      "bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-800/40",
    shipped:
      "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/40",
    delivered:
      "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/40",
    cancelled:
      "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/40",
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-textMain-light dark:text-textMain-dark">
          Recent Orders
        </h2>
        <Link
          to={"/admin/orders"}
          className="text-sm font-semibold text-prime dark:text-prime-darkTheme hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-textMain-light dark:text-textMain-dark">
          <thead className="text-xs uppercase bg-bgMain-light dark:bg-bgMain-dark text-textMain-light/60 dark:text-textMain-dark/60 rounded-lg">
            <tr>
              <th className="p-3 rounded-l-xl">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3 rounded-r-xl">Date</th>
            </tr>
          </thead>
          {ordersShow?.map((order) => (
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="p-3 font-semibold">
                  {order._id.slice(0, 6)}...
                </td>
                <td className="p-3">
                  {typeof order.user == "string"
                    ? order.user.slice(0, 6)
                    : order.user._id}
                  ...
                </td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusStyles[order.orderStatus]}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3 font-medium">{order.finalPrice}</td>
                <td className="p-3 text-textMain-light/60 dark:text-textMain-dark/60">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
