import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewCategory,
  deleteCategoryById,
  findAllCategories,
  updateCategory,
  updateCategoryImage,
} from "../../services/categories.serives";
import { getCategoryById } from "../../../category/category.services";
import { toast } from "react-toastify";

interface Category {
  name: string;
  description: string;
  image?: string;
  _id?: string;
}
export function useCategoriesManagement() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>({
    name: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  
  const queryClient = useQueryClient();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: getAllCategories,
  } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: findAllCategories,
  });

  const categories: Category[] = Array.isArray(categoriesData?.data?.data) 
    ? categoriesData.data.data 
    : Array.isArray(categoriesData?.data?.categories) 
      ? categoriesData.data.categories 
      : Array.isArray(categoriesData?.data) 
        ? categoriesData.data 
        : [];

  const {
    data: categoryDetailsData,
    isLoading: isCategoryDetailsLoading,
    isSuccess: isCategoryDetailsSuccess,
  } = useQuery({
    queryKey: ["adminCategoryDetails", selectedCategoryId],
    queryFn: () => getCategoryById(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });

  useEffect(() => {
    if (isCategoryDetailsSuccess && categoryDetailsData?.data?.data) {
      setCategory(categoryDetailsData.data.data);
    }
  }, [isCategoryDetailsSuccess, categoryDetailsData]);

  const getCategory = (id: string) => {
    setSelectedCategoryId(id);
  };

  const createCategoryMutation = useMutation({
    mutationFn: (formData: FormData) => createNewCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const createCategory = () => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (image) formData.append("image", image);
    createCategoryMutation.mutate(formData);
  };

  const changeCategoryInformationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    onSuccess: (_, variables) => {
      toast.success("successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
      queryClient.invalidateQueries({ queryKey: ["adminCategoryDetails", variables.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const changeCategoryInformation = (id: string) => {
    changeCategoryInformationMutation.mutate({
      id,
      data: { name: category.name, description: category.description },
    });
  };

  const changeCategoryImageMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => updateCategoryImage(id, formData),
    onSuccess: (_, variables) => {
      toast.success("successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
      queryClient.invalidateQueries({ queryKey: ["adminCategoryDetails", variables.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const changeCategoryImage = (id: string) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      changeCategoryImageMutation.mutate({ id, formData });
    }
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategoryById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const deleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id);
  };

  const loading =
    isCategoriesLoading ||
    isCategoryDetailsLoading ||
    createCategoryMutation.isPending ||
    changeCategoryInformationMutation.isPending ||
    changeCategoryImageMutation.isPending ||
    deleteCategoryMutation.isPending;
    
  const error = categoriesError ? categoriesError.message : null;

  return {
    categories,
    category,
    setCategory,
    loading,
    error,
    getAllCategories,
    createCategory,
    changeCategoryInformation,
    deleteCategory,
    getCategory,
    setImage,
    changeCategoryImage,
  };
}
