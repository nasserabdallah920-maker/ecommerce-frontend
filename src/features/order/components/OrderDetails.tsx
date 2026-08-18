import { orderStatus, statusData } from "../constants";
import type { IOrder } from "../interfaces";

export default function OrderDetails({order}:{order:IOrder}) {
  return (
    <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${orderStatus[order.orderStatus].className}`}
                        >
                          {orderStatus[order.orderStatus].label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Transaction ID: <span className="font-mono">{order._id}</span>
                      </p>
                    </div>
        
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${statusData[order.paymentStatus].className}`}
                      >
                        {statusData[order.paymentStatus].label}
                      </span>
                    </div>
                  </div>
    </div>
  )
}
