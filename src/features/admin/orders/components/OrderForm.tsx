import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  RefreshCw,
  Truck,
  XCircle,
  CreditCard,
  DollarSign,
  Package,
  Tag,
  QrCode,
  MapPin,
  Phone,
} from "lucide-react";
import React, { useEffect } from "react";
import { useOrdersManagement } from "../hooks/useOrdersManagement";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../../../../components/shared/loading";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: <Clock className="w-4 h-4" />,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  processing: {
    label: "Processing",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: <RefreshCw className="w-4 h-4" />,
  },
  shipped: {
    label: "Shipped",
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    icon: <Truck className="w-4 h-4" />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    icon: <XCircle className="w-4 h-4" />,
  },
};

export default function OrderDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { getOneOrder, selectedOrder,loading } = useOrdersManagement();

  useEffect(() => {
    if (id) getOneOrder(id);
  }, [id, getOneOrder]);

  const currentStatus: OrderStatus = selectedOrder?.orderStatus || "pending";
  const statusInfo = statusConfig[currentStatus] || statusConfig.pending;
  const addressFields = selectedOrder?.shippingAddress
    ? [
        { label: "City", value: selectedOrder.shippingAddress.city },
        { label: "Street", value: selectedOrder.shippingAddress.street },
        {
          label: "Phone Number",
          value: selectedOrder.shippingAddress.phone,
          isPhone: true,
        },
      ]
    : [];


  const summaryCards = [
    {
      label: "Paymob ID",
      value: selectedOrder?.paymob_id,
      icon: (
        <QrCode className="w-8 h-8 text-textMain-light/30 dark:text-textMain-dark/30 shrink-0" />
      ),
    },
    {
      label: "Payment Method",
      value: selectedOrder?.paymentMethod,
      icon: (
        <CreditCard className="w-8 h-8 text-blue-500/60 dark:text-blue-400/60 shrink-0" />
      ),
    },
    {
      label: "Payment Status",
      value: selectedOrder?.paymentStatus,
      icon: (
        <CheckCircle2 className="w-8 h-8 text-emerald-500/60 dark:text-emerald-400/60 shrink-0" />
      ),
      isBadge: true,
    },
    {
      label: "Shipping",
      value: `$${selectedOrder?.shipping ?? 0}`,
      icon: (
        <Truck className="w-8 h-8 text-textMain-light/30 dark:text-textMain-dark/30 shrink-0" />
      ),
    },
    {
      label: "Discount",
      value: `$${selectedOrder?.discount ?? 0}`,
      icon: (
        <Tag className="w-8 h-8 text-rose-500/60 dark:text-rose-400/60 shrink-0" />
      ),
    },
    {
      label: "Final Price",
      value: `$${selectedOrder?.finalPrice ?? 0}`,
      icon: (
        <DollarSign className="w-8 h-8 text-prime dark:text-prime-darkTheme shrink-0" />
      ),
      isHighlight: true,
    },
  ];

  if(loading)return <Loading/>
  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-textMain-light dark:text-textMain-dark hover:border-prime dark:hover:border-prime-darkTheme transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Order Details
            </h1>
            <p className="text-xs sm:text-sm text-textMain-light/70 dark:text-textMain-dark/70">
              View all order data.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-xs font-mono text-textMain-light/60 dark:text-textMain-dark/60 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" /> Order-ID: {selectedOrder?._id}
              </span>
              <h3 className="text-lg font-bold text-textMain-light dark:text-textMain-dark mt-0.5">
               user-ID{" "}
                <Link 
                to={`/admin/orders/${typeof selectedOrder?.user === 'object' ? selectedOrder?.user._id : selectedOrder?.user}`}
                className="font-mono text-sm font-normal text-prime dark:text-prime-darkTheme">
                  {typeof selectedOrder?.user === 'object' ? selectedOrder?.user._id : selectedOrder?.user}
                </Link>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-textMain-light/80 dark:text-textMain-dark/80 whitespace-nowrap">
                Order Status:
              </span>
              <div
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 ${statusInfo.color}`}
              >
                {statusInfo.icon}
                <span>{statusInfo.label}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <Package className="w-5 h-5 text-prime dark:text-prime-darkTheme" />
              Products ({selectedOrder?.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {selectedOrder?.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-textMain-light dark:text-textMain-dark">
                      {item.name}
                    </p>
                    <p className="text-xs font-mono text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
                      Product ID: {item.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base text-prime dark:text-prime-darkTheme">
                      ${item.price}
                    </p>
                    <p className="text-xs text-textMain-light/70 dark:text-textMain-dark/70">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {addressFields.length > 0 && (
            <div className="p-4 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800 space-y-3">
              <h3 className="text-sm font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
                <MapPin className="w-4 h-4 text-prime dark:text-prime-darkTheme" />{" "}
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-textMain-light/80 dark:text-textMain-dark/80">
                {addressFields.map((field, idx) => (
                  <div key={idx}>
                    <span className="text-textMain-light/50 dark:text-textMain-dark/50 block text-xs">
                      {field.label}:
                    </span>
                    <p
                      className={`font-medium ${field.isPhone ? "font-mono flex items-center gap-1 mt-0.5" : ""}`}
                      dir={field.isPhone ? "ltr" : undefined}
                    >
                      {field.isPhone && (
                        <Phone className="w-3 h-3 text-textMain-light/50 dark:text-textMain-dark/50" />
                      )}
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-5 border-t border-gray-100 dark:border-gray-800 text-xs sm:text-sm">
            {summaryCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  card.isHighlight
                    ? "bg-prime/5 dark:bg-prime-darkTheme/5 border border-prime/10 dark:border-prime-darkTheme/10"
                    : "bg-bgMain-light/50 dark:bg-bgMain-dark/50"
                }`}
              >
                {card.icon}
                <div>
                  <p className="text-textMain-light/60 dark:text-textMain-dark/60">
                    {card.label}
                  </p>
                  {card.isBadge ? (
                    <span className="inline-block mt-0.5 px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                      {card.value}
                    </span>
                  ) : (
                    <p
                      className={`font-semibold text-textMain-light dark:text-textMain-dark truncate ${card.isHighlight ? "font-bold text-base sm:text-lg text-prime dark:text-prime-darkTheme" : ""}`}
                    >
                      {card.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
