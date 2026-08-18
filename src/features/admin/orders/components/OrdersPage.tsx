import { useEffect, useState } from "react";
import { Eye, ChevronRight, ChevronLeft, ShoppingBag, Clock, CheckCircle2, PackageX } from "lucide-react";
import EmptyState from "../../../../components/shared/EmptyState";
import { useOrdersManagement } from "../hooks/useOrdersManagement";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../../components/shared/loading";

export default function OrdersPage() {
  const {
    orders,
    loading,
    getAllOrders,
    changeOrderStatus,
    getAllOrdersForOne,
  } = useOrdersManagement();

  const { id } = useParams();


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (id) {
      getAllOrdersForOne(id);
    } else {
      getAllOrders();
    }
  }, [getAllOrders, getAllOrdersForOne, id]);

  const handleStatusChange = async (orderId: string, status: string) => {
    await changeOrderStatus(orderId, status);
  };

  const safeOrders = Array.isArray(orders) ? orders : [];


  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter((o) => o.orderStatus === "pending").length;
  const deliveredOrders = safeOrders.filter((o) => o.orderStatus === "delivered").length;

  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = safeOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeStyle: Record<string, string> = {
    pending:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    confirmed:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    processing:
      "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
    shipped:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    delivered:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    cancelled: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
  };

  const tableHeaders = [
    "Order Number",
    "City",
    "Product Count",
    "Final Price",
    "Payment Status",
    "Order Status",
    "Actions",
  ];

  const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-8 md:p-12 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <ShoppingBag className="w-7 h-7 text-prime dark:text-prime-darkTheme" />
              Order Management
            </h1>
            <p className="text-xs sm:text-sm text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
              Track shipping, sales, and order status
            </p>
          </div>

          <button
            onClick={() => {
              if (id) getAllOrdersForOne(id);
              else getAllOrders();
              setCurrentPage(1);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-sm cursor-pointer self-start sm:self-auto"
          >
            Update
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mt-1">{totalOrders}</h3>
            </div>
            <div className="p-3 rounded-xl bg-prime/10 text-prime dark:text-prime-darkTheme">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Pending Orders</p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{pendingOrders}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Delivered Orders</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{deliveredOrders}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
          {safeOrders.length === 0 ? (
            <EmptyState
              icon={<PackageX className="w-12 h-12" />}
              title="No Orders Found"
              description="There are currently no orders to display."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-textMain-light/50 dark:text-textMain-dark/50 text-xs font-semibold">
                      {tableHeaders.map((header, index) => (
                        <th
                          key={index}
                          className={`pb-3 px-4 ${header === "Actions" ? "text-center" : ""}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                    {currentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-bgMain-light/50 dark:hover:bg-bgMain-dark/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-mono text-xs text-prime dark:text-prime-darkTheme font-semibold">
                          #{order._id.slice(-6)}
                        </td>
                        <td className="py-4 px-4 text-textMain-light/80 dark:text-textMain-dark/80">
                          {order.shippingAddress?.city || "Not specified"}
                        </td>
                        <td className="py-4 px-4 text-textMain-light/70 dark:text-textMain-dark/70">
                          {order.items?.length || 0} Products
                        </td>
                        <td className="py-4 px-4 font-bold text-textMain-light dark:text-textMain-dark">
                          ${order.finalPrice}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => {
                              handleStatusChange(order._id, e.target.value);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer appearance-none text-center ${getStatusBadgeStyle[order.orderStatus]}`}
                          >
                            {orderStatuses.map((status) => (
                              <option
                                key={status.value}
                                value={status.value}
                                className="bg-bgMain-light dark:bg-bgMain-dark text-textMain-light dark:text-textMain-dark"
                              >
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <Link
                              to={`/admin/order/${order._id}`}
                              className="p-2 rounded-lg text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {safeOrders.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-textMain-light/70 dark:text-textMain-dark/70">
                  <div>
                    View <span className="font-semibold text-prime dark:text-prime-darkTheme">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold text-prime dark:text-prime-darkTheme">
                      {Math.min(startIndex + itemsPerPage, safeOrders.length)}
                    </span>{" "}
                    out of <span className="font-semibold text-prime dark:text-prime-darkTheme">{safeOrders.length}</span> Orders
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="px-3 py-1 font-semibold">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}