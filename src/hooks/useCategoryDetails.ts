import { useCallback, useState } from "react";
import type { ICategory } from "../features/category/category.interfaces";
import type { IProduct } from "../features/products/products.interfaces";
import { getCategoryById } from "../features/category/category.services";
import { getProductByCategoryId } from "../features/products/products.services";
import axios from "axios";

export const useCategoryDetails = () => {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsByCategory, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCategory =useCallback( async (id:string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategoryById(id);
      const productResponse = await getProductByCategoryId(id);
      setCategory(response.data.data);
      setProducts(productResponse?.data.data || []);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to fetch category details",
        );
      }
    } finally {
      setLoading(false);
    }
  },[])

  return {
    category,
    productsByCategory,
    loading,
    error,
    fetchCategory,
  };
};
