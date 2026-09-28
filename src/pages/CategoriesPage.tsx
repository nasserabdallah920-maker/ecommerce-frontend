import { useHomeData } from "../hooks/useHomeData";
import Categories from "../components/shared/Categories";

export default function CategoriesPage() {
  const { categories, categoriesLoading } = useHomeData();
  return <Categories categories={categories} loading={categoriesLoading} />;
}
