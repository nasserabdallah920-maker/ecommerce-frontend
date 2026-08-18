import {
  Ticket,
  Calendar,
  Hash,
  Percent,
  ShoppingBag,
  PlusCircle,
  Tag,
  ChevronDown,
  CheckSquare,
} from "lucide-react";

import { useCouponsManagement } from "../hooks/useCouponsManagement";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../../../components/shared/loading";

export default function CouponCreateFormView() {
  const {
    coupon,
    setCoupon,
    handleChange,
    handleChangeNumber,
    getOneCoupon,
    editCoupon,
    createNewCoupon,
    loading,
  } = useCouponsManagement();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getOneCoupon(id, false);
    }
  }, [getOneCoupon, id]);
  if (loading) return <Loading />;
  return (
    <form className="mt-6 p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Ticket className="w-5 h-5 text-prime dark:text-prime-darkTheme" />
            Add New Coupon
          </h2>
          <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-1">
            Fill the following data to create a new coupon
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Tag className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Discount Code (Code)
          </label>
          <input
            onChange={(e) =>
              setCoupon((prev) => ({
                ...prev,
                [e.target.name]: e.target.value.toUpperCase(),
              }))
            }
            defaultValue={coupon.code}
            name="code"
            type="text"
            placeholder="Example: SUMMER2026"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm uppercase font-bold tracking-wider placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Percent className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Discount Type (Type)
          </label>
          <div className="relative">
            <select
              onChange={(e) => handleChange(e)}
              name="type"
              value={coupon?.type}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm appearance-none focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors cursor-pointer"
            >
              <option defaultChecked value="percentage">
                Percentage (%)
              </option>
              <option value="fixed">Fixed Amount (EGP.م)</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Percent className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Discount Value (Discount Value)
          </label>
          <input
            onChange={(e) => handleChangeNumber(e)}
            name="value"
            defaultValue={coupon?.value}
            type="number"
            placeholder="15"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Ticket className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Total Usage Limit (Usage Limit)
          </label>
          <input
            onChange={(e) => handleChangeNumber(e)}
            name="usageLimit"
            value={coupon.usageLimit}
            type="number"
            placeholder="500"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Minimum Order (Min Order)
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleChangeNumber(e)}
              name="minOrder"
              value={coupon.minOrder}
              type="number"
              placeholder="100"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-textMain-light/40 dark:text-textMain-dark/40">
              EGP
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Hash className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Maximum Discount (Max Discount)
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleChangeNumber(e)}
              name="maxDiscount"
              value={coupon.maxDiscount}
              type="number"
              placeholder="50"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-textMain-light/40 dark:text-textMain-dark/40">
              EGP
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Calendar className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Expiration Date (Expiration Date)
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="expiresAt"
            value={coupon.expiresAt.split("T")[0]}
            type="date"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>

        <div className="space-y-2 flex flex-col justify-end">
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 cursor-pointer">
            <input
              onChange={(e) =>
                setCoupon((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
              name="isActive"
              type="checkbox"
              checked={coupon.isActive}
              className="w-4 h-4 accent-prime rounded cursor-pointer"
            />
            <span className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Activate coupon immediately
            </span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-bgMain-light dark:bg-bgMain-dark hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all active:scale-95 cursor-pointer text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (id) {
              editCoupon(id, coupon);
            } else {
              createNewCoupon(coupon);
            }
          }}
          type="button"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all shadow-sm active:scale-95 cursor-pointer text-sm gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          {id ? "Edit Coupon" : " Create Coupon"}
        </button>
      </div>
    </form>
  );
}
