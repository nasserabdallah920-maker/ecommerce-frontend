import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/products.services";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../category/category.services";
import type { ICategory } from "../../../category/category.interfaces";
import { createProductValidation } from "../products.validations";
import { validator } from "../../../../utils/zodValidator";

export const useAddProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const queryClient = useQueryClient();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    refetch: getCategories,
  } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: getAllCategories,
  });

  const categories: ICategory[] = categoriesData?.data?.data || [];

  const reset = () => {
    setDescription("");
    setTitle("");
    setStock("");
    setPrice("");
    setCategory("");
    setImages([]);
  };

  const addProductMutation = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: (res) => {
      if (res.status === 201) {
        reset();
        toast.success("The product was created successfully");
        queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      }
    },
    onError: (err: any) => {
      if (err.response?.status === 422) {
        toast.error("Category not found");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    },
  });

  const addProduct = () => {
    const check = validator(createProductValidation, {
      title,
      description,
      price,
      stock,
      category,
    });

    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);

    images.forEach((image: File) => {
      formData.append("images", image);
    });

    addProductMutation.mutate(formData);
  };

  const loading = isCategoriesLoading || addProductMutation.isPending;

  return {
    setDescription,
    setImages,
    setPrice,
    setStock,
    setTitle,
    addProduct,
    description,
    reset,
    title,
    stock,
    price,
    category,
    setCategory,
    getCategories,
    categories,
    loading,
  };
};