import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../../../products/products.services";
import {
  addProductImage,
  deleteProductImage,
  updateProductInfromation,
} from "../../services/products.services";
import type { IProduct } from "../../../products/products.interfaces";
import { toast } from "react-toastify";

export const useEditProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [description, setDescription] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  
  const queryClient = useQueryClient();

  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["adminProductDetails", selectedProductId],
    queryFn: () => getProductById(selectedProductId!),
    enabled: !!selectedProductId,
  });

  const product: IProduct | undefined = productData?.data?.data;

  useEffect(() => {
    if (isSuccess && product) {
      setTitle(product.title);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setDescription(product.description);
    }
  }, [isSuccess, product]);

  const getProduct = (id: string) => {
    setSelectedProductId(id);
  };

  const removeImageMutation = useMutation({
    mutationFn: ({ productId, imageName }: { productId: string; imageName: string }) =>
      deleteProductImage(productId, imageName),
    onSuccess: (_, variables) => {
      toast.success("Image removed successfully");
      queryClient.invalidateQueries({ queryKey: ["adminProductDetails", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error deleting image");
    },
  });

  const addImageMutation = useMutation({
    mutationFn: ({ productId, formData }: { productId: string; formData: FormData }) =>
      addProductImage(productId, formData),
    onSuccess: (_, variables) => {
      toast.success("Image added successfully");
      setNewImages([]);
      queryClient.invalidateQueries({ queryKey: ["adminProductDetails", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error uploading image");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProductInfromation(id, data),
    onSuccess: (_, variables) => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminProductDetails", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error updating product");
    },
  });

  const removeImage = (productId: string, imageName: string) => {
    removeImageMutation.mutate({ productId, imageName });
  };

  const addImage = (productId: string) => {
    if (!newImages.length) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    newImages.forEach((image) => formData.append("images", image));

    addImageMutation.mutate({ productId, formData });
  };

  const updateProduct = (id: string) => {
    const updatedProductData = {
      title,
      description,
      stock: String(stock),
      price: String(price),
    };
    updateProductMutation.mutate({ id, data: updatedProductData });
  };

  const loading =
    isProductLoading ||
    removeImageMutation.isPending ||
    addImageMutation.isPending ||
    updateProductMutation.isPending;

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