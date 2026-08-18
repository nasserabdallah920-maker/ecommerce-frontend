import { Banknote, CreditCard, ExternalLink, Loader2 } from "lucide-react";
import type { IOrder } from "../interfaces";

export default function Actions({
  id,
  handlePaymobClick,
  isPaymobLoading,
  isCashLoading,
  order,
  handleCashClick,
}: {
  id?: string;
  handlePaymobClick: (e: string) => void;
  isPaymobLoading: boolean;
  isCashLoading: boolean;
  order: IOrder;
  handleCashClick: (e: string) => void;
}) {
  return (
    <div>
      <div className="mt-8 space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Choose payment and completion method:
        </p>

        <button
          type="button"
          onClick={() => {
            if (id) {
              handlePaymobClick(id);
            }
          }}
          disabled={
            isPaymobLoading ||
            isCashLoading ||
            order.orderStatus === "confirmed"
          }
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2.5 text-sm"
        >
          {isPaymobLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirecting to Paymob...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Online payment via Paymob</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 mr-auto" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (id) {
              handleCashClick(id);
            }
          }}
          disabled={
            isCashLoading ||
            isPaymobLoading ||
            order.orderStatus === "confirmed"
          }
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2.5 text-sm"
        >
          {isCashLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirming......</span>
            </>
          ) : (
            <>
              <Banknote className="w-4 h-4" />
              <span>Confirm as Cash on Delivery</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
