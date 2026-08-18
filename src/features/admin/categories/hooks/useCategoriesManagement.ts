import { useState, useCallback } from "react";
import axios from "axios";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const getAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await findAllCategories();
      const data = res.data.data || res.data.categories || res.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategory = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getCategoryById(id);

      setCategory(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");
    } finally {
      setLoading(false);
    }
  }, []);
  const createCategory = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      if (image) formData.append("image", image);

      await createNewCategory(formData);

      await getAllCategories();
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");
    } finally {
      setLoading(false);
    }
  };

  const changeCategoryInformation = async (id: string) => {
    setLoading(true);
    try {
      await updateCategory(id, {
        name: category.name,
        description: category.description,
      });
      toast.success("successfully");
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");
    } finally {
      setLoading(false);
    }
  };
  const changeCategoryImage = async (id: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
        await updateCategoryImage(id, formData);
        toast.success("successfully");
      }
      return;
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      deleteCategoryById(id);
      getAllCategories();
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data.message || "something error");
    } finally {
      setLoading(false);
    }
  };

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
