import { useCallback, useState } from "react";
import { Axios } from "../../../../lib/axios";
import type { IProduct } from "../../../products/products.interfaces";
import { getAllCategories } from "../../../category/category.services";
import type { ICategory } from "../../../category/category.interfaces";
import { deleteProduct } from "../../services/products.services";
import { getProductByCategoryId } from "../../../products/products.services";
import { toast } from "react-toastify";
import axios from "axios";

export const useProductManagement = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching products");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching categories");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      await getProducts();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error deleting product");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (category: string) => {
    if (!category) return;

    setLoading(true);
    try {
      const res = await getProductByCategoryId(category);
      setProducts(res?.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error searching products");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getProducts,
    products,
    getCategories,
    categories,
    removeProduct,
    searchProducts,
    loading,
  };
};