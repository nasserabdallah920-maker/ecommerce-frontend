import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../features/category/category.services";
import { getProductByCategoryId } from "../features/products/products.services";

export const useCategoryDetails = (id?: string) => {
  const {
    data: categoryResponse,
    isLoading: categoryLoading,
    error: categoryErrorObj,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
  });

  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsErrorObj,
  } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: () => getProductByCategoryId(id!),
    enabled: !!id,
  });

  const category = categoryResponse?.data?.data || null;
  const productsByCategory = productsResponse?.data?.data || [];

  const loading = categoryLoading || productsLoading;
  const errorObj = categoryErrorObj || productsErrorObj;
  const error = errorObj ? errorObj.message : null;

  return {
    category,
    productsByCategory,
    loading,
    error,
  };
};
