import { CheckCircle2, ShieldCheck, Tag } from "lucide-react";
import { useCoupon } from "../hooks/useCoupon";

import React, { useEffect } from "react";
import { calculateSubtotal } from "../../../utils/cart";
import { createOrder } from "../checkout.services";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { IShippingAddress } from "../../order/interfaces";
import Loading from "../../../components/shared/loading";
import { useFetchCart } from "../../cart/hooks/useFetchCart";
import { toast } from "react-toastify";


export default function CouponForm({
  shippingAddress,
}: {
  shippingAddress: IShippingAddress;
}) {
  const { cart, fetchCart, loading } = useFetchCart();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const cartItems = cart?.items ?? [];
  const subtotal = calculateSubtotal(cartItems);
  const shipping = Number(import.meta.env.VITE_SHIPPING_PRICE);
  const shippingFee = subtotal > 0 ? shipping : 0;
  const total = subtotal + shippingFee;
  const {
    handleApplyCoupon,
    finalPrice,
    discount,
    couponApplied,
    setCouponCode,
    couponCode,
  } = useCoupon(total);
  const nav = useNavigate();

  const checkoutDetails = { shippingAddress, couponCode };
  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await createOrder(checkoutDetails);
      if (res.status == 200) {
        nav(`/checkout/order/${res.data.data._id}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message||'something error')
      }
    }
  };
  if(loading)return <Loading/>

  return (
    <>
     
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              Order Summary ({cartItems.length} Products)
            </h3>

            <div className="max-h-52 overflow-y-auto space-y-3 pl-1 mb-4 custom-scrollbar">
              {cart?.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <span className="truncate opacity-90">
                      {item.product.title}
                    </span>
                  </div>
                  <span className="font-bold whitespace-nowrap">
                    {(item.product.price * item.quantity).toFixed(2)} $
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-5 h-5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-center text-xs font-bold">
                    *
                  </span>
                  <span className="truncate opacity-90">Shipping</span>
                </div>
                <span className="font-bold whitespace-nowrap">{shipping}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mb-4">
              <label className="block text-xs font-semibold mb-2 opacity-80">
                Discount Code (Try: SAVE10)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    placeholder="SAVE10"
                    className="w-full pr-9 pl-3 py-2 text-xs uppercase rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode.trim()}
                  className="px-4 py-2 text-xs font-bold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:opacity-90 disabled:opacity-40 transition-all"
                >
                  {couponApplied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2.5 text-sm pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between opacity-80">
                <span>Subtotal</span>
                <span>{total} $</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-{discount.toFixed(2)}$</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-gray-100 dark:border-gray-800 text-base font-extrabold">
                <span>Final Total</span>
                <span className="text-xl text-indigo-600 dark:text-indigo-400">
                  {finalPrice !== undefined ? finalPrice : total}$
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 px-4 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2"
            >
              continue
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure payment & encryption 256-bit for data</span>
            </div>
          </div>
        </div>
  
    </>
  );
}
