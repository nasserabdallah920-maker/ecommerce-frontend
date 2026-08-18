import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ICart } from "../cart.interfaces";

export default function Actions({
  cart,
  handleClearCart,
}: {
  cart?: ICart;
  handleClearCart: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-semibold text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Link>

        {cart && cart.items && cart.items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-xl font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-red-500/10"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}
