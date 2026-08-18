import { useCallback, useState } from "react";
import type { IProduct } from "../features/products/products.interfaces";
import type { ICategory } from "../features/category/category.interfaces";
import { getAllProducts } from "../features/products/products.services";
import { getAllCategories } from "../features/category/category.services";
import axios from "axios";
export const useHomeData = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);


  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const res = await getAllProducts(page, limit);
      setProducts(res?.data?.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setProductsError(err.message || "Failed to load products");
      }
    } finally {
      setProductsLoading(false);
    }
  }, [page, limit]);

 
  const fetchCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);
      const res = await getAllCategories();
      setCategories(res?.data?.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setCategoriesError(err.message || "Failed to load categories");
      }
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

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
    fetchCategories
  };
};