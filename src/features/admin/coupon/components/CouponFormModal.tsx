import { Ticket, Calendar, Hash, Percent, ShoppingBag } from "lucide-react";
import { useCouponsManagement } from "../hooks/useCouponsManagement";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatDate } from "../../../../utils/formatDate";
import Loading from "../../../../components/shared/loading";

export default function CouponView() {
  const { getOneCoupon, coupon, loading } = useCouponsManagement();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getOneCoupon(id, true);
    }
  }, [getOneCoupon, id]);

  const couponDetails = [
    {
      id: "value",
      label: "Discount Value",
      value:
        coupon?.type === "percentage"
          ? `${coupon?.value}%`
          : `${coupon?.value} EGP.م`,
      icon: Percent,
    },
    {
      id: "minOrder",
      label: "Minimum Order",
      value: `${coupon?.minOrder ?? 0} EGP.م`,
      icon: ShoppingBag,
    },
    {
      id: "maxDiscount",
      label: "Maximum Discount",
      value: `${coupon?.maxDiscount ?? 0} EGP.م`,
      icon: Hash,
    },
    {
      id: "expiresAt",
      label: "Expiration Date",
      value: formatDate(coupon?.expiresAt ? coupon?.expiresAt : ""),
      icon: Calendar,
    },
  ];

  const usagePercentage =
    coupon?.usedCount && coupon?.usageLimit
      ? Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)
      : 0;

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-prime/10 text-prime dark:text-prime-darkTheme">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-textMain-light dark:text-textMain-dark">
              Coupon Details
            </h2>
            <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60">
              Preview current coupon details
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
            coupon?.isActive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              coupon?.isActive ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
          {coupon?.isActive ? "Active Coupon" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 flex flex-col justify-center space-y-1.5">
          <span className="text-xs font-semibold text-textMain-light/70 dark:text-textMain-dark/70">
            Discount Code (Code)
          </span>
          <div className="p-3 text-center text-lg font-black tracking-widest text-prime bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 rounded-xl uppercase">
            {coupon?.code || "—"}
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {couponDetails.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark text-prime shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium mb-0.5">
                    {item.label}
                  </span>
                  <span className="font-bold text-sm text-textMain-light dark:text-textMain-dark">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex justify-between text-xs font-semibold text-textMain-light/70 dark:text-textMain-dark/70">
          <span>Usage Rate</span>
          <span>
            {coupon?.usedCount ?? 0} out of {coupon?.usageLimit ?? 0} uses
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-bgMain-light dark:bg-bgMain-dark overflow-hidden">
          <div
            className="h-full bg-prime transition-all duration-300 rounded-full"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
