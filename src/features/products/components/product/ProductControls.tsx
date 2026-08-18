import {
  Check,
  Heart,
  Minus,
  Plus,

  ShoppingBag,

} from "lucide-react";
import { useProductDetails } from "../../hooks/useProductDetails";
import { useParams } from "react-router-dom";
import { useWishlist } from "../../../wishlist/hooks/useWishlist";
import { features } from "../../product.constants";
import Loading from "../../../../components/shared/loading";

export default function ProductControls() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    quantity,
    addedToCart,
    handleQuantityChange,
    handleAddToCart,loading
  } = useProductDetails(id);
  const { isInWishlist, toggleWishlist, actionLoading } = useWishlist();

if(loading) return<Loading/>
  return (
    <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
      {product && product.stock > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-textMain-light dark:text-textMain-dark">
            Quantity:
          </span>
          <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl bg-surface-light dark:bg-surface-dark overflow-hidden">
            <button
              onClick={() => handleQuantityChange("dec")}
              disabled={quantity <= 1}
              className="p-2.5 text-textMain-light dark:text-textMain-dark hover:bg-bgMain-light dark:hover:bg-bgMain-dark disabled:opacity-30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-bold text-textMain-light dark:text-textMain-dark">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange("inc")}
              disabled={quantity >= product.stock}
              className="p-2.5 text-textMain-light dark:text-textMain-dark hover:bg-bgMain-light dark:hover:bg-bgMain-dark disabled:opacity-30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {product && (
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              addedToCart
                ? "bg-emerald-600 text-white"
                : "bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark hover:opacity-90"
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-5 h-5" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </>
            )}
          </button>
        )}
        <button
          onClick={() => product?._id && toggleWishlist(product._id)}
          disabled={actionLoading === product?._id}
          className={`p-4 rounded-2xl border transition-all shadow-sm active:scale-95 disabled:opacity-50 ${
            product?._id && isInWishlist(product._id)
              ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500"
              : "bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark hover:border-red-200 dark:hover:border-red-500/30 hover:text-red-500"
          }`}
          title={
            product?._id && isInWishlist(product._id)
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <Heart
            className={`w-6 h-6 ${actionLoading === product?._id ? "animate-pulse" : ""}`}
            fill={
              product?._id && isInWishlist(product._id)
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/60">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800"
            >
              <Icon className="w-5 h-5 text-prime dark:text-prime-darkTheme mb-1" />
              <span className="text-[11px] font-semibold text-textMain-light/80 dark:text-textMain-dark/80">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
