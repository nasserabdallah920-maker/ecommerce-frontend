import { useCallback, useState } from "react";
import { createProduct } from "../../services/products.services";
import { toast } from "react-toastify";
import axios from "axios";
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error loading categories");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setDescription("");
    setTitle("");
    setStock("");
    setPrice("");
    setCategory("");
    setImages([]);
  };

  const addProduct = async () => {
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

    setLoading(true);
    try {
      const res = await createProduct(formData);
      if (res.status === 201) {
        reset();
        toast.success("The product was created successfully");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          toast.error("Category not found");
        } else {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

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