import { useCallback, useState } from "react";
import { getProductById } from "../../../products/products.services";
import {
  addProductImage,
  deleteProductImage,
  updateProductInfromation,
} from "../../services/products.services";
import type { IProduct } from "../../../products/products.interfaces";
import { toast } from "react-toastify";
import axios from "axios";

export const useEditProduct = () => {
  const [product, setProduct] = useState<IProduct>();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [description, setDescription] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProduct = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getProductById(id);
      const productData = res?.data.data;
      setProduct(productData);
      setTitle(productData.title);
      setPrice(productData.price);
      setStock(productData.stock);
      setDescription(productData.description);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching product");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeImage = async (productId: string, imageName: string) => {
    setLoading(true);
    try {
      await deleteProductImage(productId, imageName);
      toast.success("Image removed successfully");
      await getProduct(productId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error deleting image");
      }
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (productId: string) => {
    if (!newImages.length) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    newImages.forEach((image) => formData.append("images", image));

    setLoading(true);
    try {
      await addProductImage(productId, formData);
      toast.success("Image added successfully");
      setNewImages([]);
      await getProduct(productId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error uploading image");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string) => {
    const updatedProductData = {
      title,
      description,
      stock: String(stock),
      price: String(price),
    };

    setLoading(true);
    try {
      await updateProductInfromation(id, updatedProductData);
      toast.success("Product updated successfully");
      await getProduct(id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error updating product");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getProduct,
    title,
    price,
    stock,
    description,
    removeImage,
    product,
    loading,
    setDescription,
    setPrice,
    setStock,
    setTitle,
    updateProduct,
    addImage,
    setNewImages,
    newImages,
  };
};