import { ChevronRight, Clock, Package } from "lucide-react";
import { useOreders } from "../hooks/useOrders";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import Loading from "../../../components/shared/loading";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import FeedbackMessage from "../../../components/shared/FeedbackMessage";
import EmptyState from "../../../components/shared/EmptyState";

export default function OrdersList() {
  const isCompleted = useSelector(
    (state: RootState) => state.authuser.isCompleted
  );
  const { orders, loading } = useOreders(isCompleted);
  const nav = useNavigate();

  const orderStatusClasses = {
    pending:
      "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50",
    confirmed:
      "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50",
    shipped:
      "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50",
    delivered:
      "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50",
    cancelled:
      "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50",
  };

  if (!isCompleted) {
    return (
      <div className="p-6 max-w-6xl mx-auto w-full mt-10">
        <FeedbackMessage
          type="info"
          title="You are not logged in"
          message="Please log in to view your orders history and track your packages."
          action={
            <div className="flex justify-center gap-4 mt-2">
              <Link
                to="/"
                className="px-6 py-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark font-bold text-xs sm:text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-2xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-prime/10 text-prime dark:text-prime-darkTheme">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
            Orders History
          </h1>
          <p className="text-xs sm:text-sm text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
            {orders?.length
              ? `You have ${orders.length} order(s) placed`
              : "Track and manage your selected orders"}
          </p>
        </div>
      </div>

      {(!orders || orders.length === 0) && (
        <EmptyState
          icon={<Package className="w-12 h-12" />}
          title="No orders found"
          description="Looks like you haven't placed any orders yet. Explore our products and start shopping!"
          action={
            <div className="mt-4">
              <Link
                to="/products"
                className="px-6 py-3 rounded-2xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          }
        />
      )}

      {orders && orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => {
            const orderId = String(order._id);
            const shortId = `#${orderId.slice(-6).toUpperCase()}`;

            return (
              <div
                key={orderId}
                className="group p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-prime/50 dark:hover:border-prime-darkTheme/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-base text-textMain-light dark:text-textMain-dark">
                      {shortId}
                    </span>

                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${orderStatusClasses[order.orderStatus as keyof typeof orderStatusClasses]}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-textMain-light dark:text-textMain-dark line-clamp-1">
                      {order.items
                        .map((item) => `${item.name} (${item.quantity}x)`)
                        .join(", ")}
                    </p>

                    <div className="flex items-center text-xs text-textMain-light/60 dark:text-textMain-dark/60 gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-textMain-light/40 dark:text-textMain-dark/40" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 uppercase">
                      Final Price
                    </p>
                    <h3 className="text-xl font-bold text-textMain-light dark:text-textMain-dark">
                      ${order.finalPrice.toFixed(2)}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      nav(`/checkout/order/${order._id}`);
                    }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-prime dark:text-prime-darkTheme group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}