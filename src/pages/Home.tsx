import ValueFeatures from "./HomeFeatures";
import Products from "../components/shared/Products";
import Categories from "../components/shared/Categories";
import { useHomeData } from "../hooks/useHomeData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWishlist } from "../features/wishlist/Redux/wishlistSlice";
import type { AppDispatch } from "../Redux/store";

export default function UserHome() {
  const {
    categories,
    fetchCategories,
    fetchProducts,
    page,
    productsLoading,
    categoriesLoading,
  } = useHomeData();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts, page]);

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark transition-colors duration-300">
      <ValueFeatures />
      <Products loading={productsLoading} />
      <Categories loading={categoriesLoading} categories={categories} />
    </div>
  );
}
