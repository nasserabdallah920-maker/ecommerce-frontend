import Loading from "../../../components/shared/loading";

import Actions from "./Actions";
import ProductCart from "./ProductCart";
import { useFetchCart } from "../hooks/useFetchCart";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { Link } from "react-router-dom";
import FeedbackMessage from "../../../components/shared/FeedbackMessage";

export default function CartView() {
  const {
    loading,
    handleClearCart,
    cart,
    handleQuantityChange,
    handleRemoveItem,
  } = useFetchCart();

  const isCompleted = useSelector((state: RootState) => state.authuser.isCompleted);
    if(!isCompleted){return(
      <div className="p-6 max-w-6xl mx-auto w-full mt-10">
        <FeedbackMessage
          type="info"
          title="You are not logged in"
          message="Please log in to view your shopping cart and manage your items."
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
    )}

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark transition-colors duration-300 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Actions handleClearCart={handleClearCart} cart={cart} />
            <ProductCart
              loading={loading}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
              cart={cart}
            />
          </div>
        </div>
      )}
    </>
  );
}
