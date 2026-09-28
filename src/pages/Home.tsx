import ValueFeatures from "./HomeFeatures";
import Products from "../components/shared/Products";
import Categories from "../components/shared/Categories";
import { useHomeData } from "../hooks/useHomeData";
import { useEffect } from "react";

export default function UserHome() {
  const {
    products,
    categories,
    fetchCategories,
    fetchProducts,
    page,
    productsLoading,
    categoriesLoading,
  } = useHomeData();

  useEffect(() => {
    if (!categories || categories.length === 0) fetchCategories();
    if (!products || products.length === 0) fetchProducts();
  }, [fetchCategories, fetchProducts, page, categories, products]);

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark transition-colors duration-300">
      <ValueFeatures />
      <Products loading={productsLoading} />
      <Categories loading={categoriesLoading} categories={categories} />
    </div>
  );
}
