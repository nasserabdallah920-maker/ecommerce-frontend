import { Link } from "react-router-dom";
import { Heart, Trash2, HeartOff } from "lucide-react";
import { useSelector } from "react-redux";
import FeedbackMessage from "../../../components/shared/FeedbackMessage";
import EmptyState from "../../../components/shared/EmptyState";
import type { RootState } from "../../../Redux/store";
import { useWishlist } from "../hooks/useWishlist";
import type { IProduct } from "../../products/products.interfaces";

export default function Wishlist() {
  const { handleRemove, wishlistData } = useWishlist();
  
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState
  );

  if (!userPayload?.token) {
    return (
      <div className="p-6 max-w-6xl mx-auto w-full mt-10">
        <FeedbackMessage
          type="info"
          title="You are not logged in"
          message="Please log in to view and save your favorite items to your wishlist."
          action={
            <div className="flex justify-center gap-4 mt-2">
              <Link
                to="/"
                className="px-6 py-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark font-bold text-xs sm:text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-2xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  if (!Array.isArray(wishlistData) || wishlistData.length === 0) {
    return (
      <div className="p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <Heart
            className="w-8 h-8 text-prime dark:text-prime-darkTheme"
            fill="currentColor"
          />
          <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
            My Wishlist
          </h1>
        </div>
        <EmptyState
          icon={<HeartOff className="w-12 h-12" />}
          title="Your wishlist is empty"
          description="Save items you love to your wishlist to review them later or share them with friends."
          action={
            <div className="mt-4">
              <Link
                to="/user"
                className="px-8 py-4 bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Explore Products
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <Heart
          className="w-8 h-8 text-prime dark:text-prime-darkTheme"
          fill="currentColor"
        />
        <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
          My Wishlist
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistData.map((item: unknown) => {
          const wishItem = item as { product?: IProduct, _id?: string } & IProduct;
          const product: IProduct = wishItem.product || wishItem;
          const productId = product?._id || wishItem._id;
          const imageUrl = product?.images?.[0]
            ? product.images[0]
            : "/placeholder.png";

          return (
            <div
              key={productId}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <Link
                to={`/user/product/${productId}`}
                className="relative h-64 overflow-hidden block"
              >
                <img
                  src={imageUrl}
                  alt={product?.title || "Product Image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product && product.stock <= 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    Out of Stock
                  </span>
                )}
              </Link>

              <div className="p-5 flex flex-col grow">
                <Link
                  to={`/user/product/${productId}`}
                  className="block grow"
                >
                  <h3 className="font-bold text-lg text-textMain-light dark:text-textMain-dark mb-1 line-clamp-1 group-hover:text-prime dark:group-hover:text-prime-darkTheme transition-colors">
                    {product?.title}
                  </h3>
                  <p className="text-sm text-textMain-light/60 dark:text-textMain-dark/60 mb-4 line-clamp-2">
                    {product?.description}
                  </p>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xl font-black text-prime dark:text-prime-darkTheme">
                    ${product?.price}
                  </span>
                  {productId && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(productId);
                      }}
                      className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}