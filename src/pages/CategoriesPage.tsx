import { useEffect } from "react";
import { useHomeData } from "../hooks/useHomeData";
import Categories from "../components/shared/Categories";

export default function CategoriesPage() {
  const { fetchCategories, categories, categoriesLoading } = useHomeData();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return <Categories categories={categories} loading={categoriesLoading} />;
}
