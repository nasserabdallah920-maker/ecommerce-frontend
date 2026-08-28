import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../features/products/products.services";
import { getAllCategories } from "../features/category/category.services";
import type { IProduct } from "../features/products/products.interfaces";
import type { ICategory } from "../features/category/category.interfaces";

export const useHomeData = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);

  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsErrorObj,
    refetch: fetchProducts,
  } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getAllProducts(page, limit),
  });

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesErrorObj,
    refetch: fetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const products: IProduct[] = productsResponse?.data?.data || [];
  const categories: ICategory[] = categoriesResponse?.data?.data || [];

  const productsError = productsErrorObj ? productsErrorObj.message : null;
  const categoriesError = categoriesErrorObj ? categoriesErrorObj.message : null;

  return {
    products,
    categories,
    productsLoading,
    categoriesLoading,
    productsError,
    categoriesError,
    page,
    limit,
    setPage,
    setLimit,
    fetchProducts,
    fetchCategories,
  };
};