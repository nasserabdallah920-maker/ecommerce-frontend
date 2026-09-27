import {
  AlertCircle,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { calculateSubtotal } from "../../../utils/cart";
import type { ICartItem, ICart } from "../cart.interfaces";
import Loading from "../../../components/shared/loading";

interface IProps {
  cart?: ICart;
  error?: string;
  loading: boolean;
  handleQuantityChange: (id:string,quan:number) => void;
  handleRemoveItem: (id:string) => void;
}
export default function ProductCart({
  cart,
  error,
  loading,
  handleQuantityChange,
  handleRemoveItem,
}: IProps) {
  const nav = useNavigate();

  
  const subtotal = cart ? calculateSubtotal(cart.items) : 0;
  const shipping=Number(import.meta.env.VITE_SHIPPING_PRICE)
  const shippingFee = subtotal > 0 ? shipping : 0;
  const total = subtotal + shippingFee;
  if(loading)return <Loading/>

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-prime/10 text-prime dark:text-prime-darkTheme">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
            {cart?.items?.length
              ? `You have ${cart.items.length} unique item(s) in your cart`
              : "Manage your selected items"}
          </p>
        </div>
      </div>
      {error && !loading && (
        <div className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-textMain-light dark:text-textMain-dark mb-2">
            Error Loading Cart
          </h3>
          <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        (!cart || !cart.items || cart.items.length === 0) && (
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-87.5 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-prime/10 text-prime dark:text-prime-darkTheme flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-textMain-light dark:text-textMain-dark mb-2">
              Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-textMain-light/60 dark:text-textMain-dark/60 max-w-sm mb-6">
              Looks like you haven't added anything to your cart yet. Explore
              our products and start shopping!
            </p>
            <Link
              to="/products"
              className="px-6 py-3 rounded-2xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        )}

      {!loading && !error && cart && cart.items && cart.items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cart.items.map((item: ICartItem) => {
              const prod = item.product;

              const imageUrl = prod?.images[0];

              return (
                <div
                  key={prod?._id}
                  className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-bgMain-light dark:bg-bgMain-dark shrink-0">
                      <img
                        src={imageUrl}
                        alt={prod?.title || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-textMain-light dark:text-textMain-dark line-clamp-1">
                        {prod?.title || "Product Name Unavailable"}
                      </h3>
                      <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-1">
                        Price:{" "}
                        <span className="font-semibold">${prod.price}</span>
                      </p>
                      <p className="text-xs font-extrabold text-prime dark:text-prime-darkTheme mt-2 sm:hidden">
                        Total: ${prod.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-1">
                      <button
                        onClick={() => handleQuantityChange(prod._id, -1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark text-textMain-light/70 dark:text-textMain-dark/70 disabled:opacity-40 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <p className="w-8 text-center text-sm font-bold text-textMain-light dark:text-textMain-dark select-none">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => handleQuantityChange(prod._id, 1)}
                        disabled={
                          prod.stock !== undefined &&
                          item.quantity >= prod.stock
                        }
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark text-textMain-light/70 dark:text-textMain-dark/70 disabled:opacity-40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-20">
                      <span className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 block">
                        Total
                      </span>
                      <span className="text-sm font-extrabold text-textMain-light dark:text-textMain-dark">
                        ${(prod.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(prod._id)}
                      className="p-2.5 rounded-xl text-textMain-light/40 dark:text-textMain-dark/40 hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6 sticky top-6">
            <h2 className="text-lg font-bold text-textMain-light dark:text-textMain-dark border-b border-gray-100 dark:border-gray-800 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-textMain-light/70 dark:text-textMain-dark/70">
                <span>Subtotal</span>
                <span className="font-bold font-mono text-textMain-light dark:text-textMain-dark">
                  ${subtotal?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-textMain-light/70 dark:text-textMain-dark/70">
                <span>Estimated Shipping</span>
                <span className="font-bold font-mono text-textMain-light dark:text-textMain-dark">
                  ${shippingFee?.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-textMain-light dark:text-textMain-dark">
                  Total
                </span>
                <span className="text-xl font-extrabold font-mono text-prime dark:text-prime-darkTheme">
                  ${total?.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => nav("/checkout")}
              className="w-full py-3.5 px-4 rounded-2xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-sm shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-textMain-light/60 dark:text-textMain-dark/60">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Secure 256-bit encrypted checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-textMain-light/60 dark:text-textMain-dark/60">
                <Tag className="w-4 h-4 text-prime dark:text-prime-darkTheme shrink-0" />
                <span>Promo codes can be applied at checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
