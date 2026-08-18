import type { IOrder } from "../interfaces";
import { Tag } from "lucide-react";

export default function Calculations({ order }: { order: IOrder }) {
  const discountAmount = order ? order?.totalPrice - order?.finalPrice : 0;

  return (
    <div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Grand Total (Total Price)</span>
          <span>{order.totalPrice.toFixed(2)} EGP.م</span>
        </div>

        {order.couponCode && (
          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              coupon ({order.couponCode})
            </span>
            <span>-{discountAmount.toFixed(2)} EGP.م</span>
          </div>
        )}

        {order.paymob_id && (
          <div className="flex justify-between text-xs text-gray-400 pt-1">
            <span>Paymob Order ID</span>
            <span className="font-mono">#{order.paymob_id}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-3 border-t border-gray-100 dark:border-gray-800 text-base font-extrabold">
          <span>Final Amount (Final Price)</span>
          <span className="text-xl text-indigo-600 dark:text-indigo-400">
            {order.finalPrice.toFixed(2)} EGP.م
          </span>
        </div>
      </div>
    </div>
  );
}
