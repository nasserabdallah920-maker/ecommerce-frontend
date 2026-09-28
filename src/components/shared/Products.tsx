import { ArrowRight, ShoppingBag, Heart, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import type { IProduct } from "../../features/products/products.interfaces";
import { useWishlist } from "../../features/wishlist/hooks/useWishlist";
import { useHomeData } from "../../hooks/useHomeData";
import { useEffect } from "react";
import { addToCart } from "../../features/cart/cart.services";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import axios from "axios";

export default function Products({
  loading,
  productsShow,
  id,
}: {
  loading: boolean;
  productsShow?: IProduct[];
  id?: string;
}) {
  const { isInWishlist, toggleWishlist, actionLoading } = useWishlist();
  const { setPage, page, fetchProducts, products } = useHomeData();
  const location = window.location.pathname;
  const pro =
    location == `/category/${id}` ? productsShow?.slice(0, 4) : products;
  const fn = () => {
    setPage(page + 1);
  };

  const userPayload = useSelector((state: RootState) => state.authuser.initialState);
  
  const handleAddToCart = async (productId: string) => {
    if (!userPayload.token) {
      toast.error("You must log in first.");
      return;
    }
    
    try {
      const res = await addToCart({ product: productId, quantity: 1 });
      if (res.status === 200) {
        toast.success("Item added successfully");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "Something went wrong");
      }
    }
  };
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
            Latest Products
          </h2>
          <p className="text-sm text-textMain-light/60 dark:text-textMain-dark/60 mt-1">
            Explore the newest arrivals in our store
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center text-sm font-bold text-prime dark:text-prime-darkTheme hover:underline"
        >
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-80 rounded-2xl bg-surface-light dark:bg-surface-dark animate-pulse"
            />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <EmptyState
          icon={<PackageX className="w-12 h-12" />}
          title="No Products Available"
          description="There are no products available at the moment."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pro?.map((product: IProduct) => {
            return (
              <div
                key={product._id}
                className="group rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-full h-52 bg-bgMain-light dark:bg-bgMain-dark relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product._id);
                    }}
                    disabled={actionLoading === product._id}
                    className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-md transition-all z-10 hover:scale-110 active:scale-95 disabled:opacity-50 ${
                      isInWishlist(product._id)
                        ? "bg-red-500/20 text-red-500"
                        : "bg-surface-light/50 dark:bg-surface-dark/50 text-textMain-light dark:text-textMain-dark hover:bg-red-500/20 hover:text-red-500"
                    }`}
                    title={
                      isInWishlist(product._id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${actionLoading === product._id ? "animate-pulse" : ""}`}
                      fill={isInWishlist(product._id) ? "currentColor" : "none"}
                    />
                  </button>

                  {product.stock <= 0 && (
                    <div className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      Out of Stock
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/product/${product._id}`}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-surface-light text-textMain-light shadow-lg hover:scale-105 transition-transform"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-bold text-textMain-light dark:text-textMain-dark line-clamp-1 mb-2"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/60">
                    <div>
                      <span className="text-lg font-extrabold text-textMain-light dark:text-textMain-dark">
                        ${product.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product._id);
                      }}
                      disabled={product.stock <= 0}
                      className="p-2.5 rounded-xl bg-prime/10 text-prime dark:text-prime-darkTheme hover:bg-prime hover:text-surface-light dark:hover:bg-prime-darkTheme dark:hover:text-bgMain-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {productsShow ? (
        <></>
      ) : (
        <div className=" flex justify-center mt-10">
          <div className="flex justify-center items-center w-24 gap-1.5 p-1 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
            <button
              onClick={() => setPage(page - 1)}
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-all duration-150 active:scale-90 cursor-pointer disabled:opacity-40"
            >
              -
            </button>

            <span className="min-w-8 px-2 text-center text-sm font-bold text-textMain-light dark:text-textMain-dark select-none">
              {page}
            </span>

            <button
              onClick={fn}
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-all duration-150 active:scale-90 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
