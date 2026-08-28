import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../../../lib/axios";
import type { IProduct } from "../../../products/products.interfaces";
import { getAllCategories } from "../../../category/category.services";
import type { ICategory } from "../../../category/category.interfaces";
import { deleteProduct } from "../../services/products.services";
import { getProductByCategoryId } from "../../../products/products.services";
import { toast } from "react-toastify";

export const useProductManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["adminProducts", selectedCategory],
    queryFn: () => (selectedCategory ? getProductByCategoryId(selectedCategory) : Axios.get("/products")),
  });

  const getProducts = () => refetchProducts();

  const products: IProduct[] | undefined = productsData?.data?.data;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: getAllCategories,
  });

  const getCategories = () => refetchCategories();

  const categories: ICategory[] | undefined = categoriesData?.data?.data;

  const removeProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error deleting product");
    },
  });

  const removeProduct = (id: string) => removeProductMutation.mutate(id);

  const searchProducts = (category: string) => {
    setSelectedCategory(category || null);
  };

  const loading = isProductsLoading || isCategoriesLoading || removeProductMutation.isPending;

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