import { Building2, MapPin, Package, Phone, Truck } from "lucide-react";

import type { IOrder, IOrderItem } from "../interfaces";

export default function Products({ order }: { order: IOrder }) {
  return (

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Ordered Products
          </h2>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {order.items.map((item: IOrderItem, idx: number) => (
              <div
                key={idx}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity} × {item.price.toFixed(2)} EGP.م
                  </p>
                </div>
                <span className="text-sm font-bold whitespace-nowrap">
                  {(item.price * item.quantity).toFixed(2)} EGP.م
                </span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Shipping Address
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                Province / City:{" "}
                <strong>{order.shippingAddress.city}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>Detailed Address: {order.shippingAddress.street}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span dir="ltr">{order.shippingAddress.phone}</span>
            </div>
          </div>
        </div>
      </div>

  );
}
