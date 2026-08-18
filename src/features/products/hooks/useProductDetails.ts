import { useState, useEffect } from "react";
import type { IProduct } from "../../products/products.interfaces";
import type { IAddToCartRequest } from "../../cart/cart.interfaces";
import { getProductById } from "../../products/products.services";
import { addToCart } from "../../cart/cart.services";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

export const useProductDetails = (id?: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const [item, setItem] = useState<IAddToCartRequest>({
    product: id,
    quantity: 1,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const res = await getProductById(id);
        setProduct(res?.data?.data || res?.data || res);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message || "Failed to load product details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (!product) return;
    if (type === "inc" && quantity < product.stock) {
      setItem((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setItem((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    if (!userPayload.token) {
      toast.error("You must log in first.");
      return;
    }
    setLoading(true);
    try {
      const res = await addToCart(item);
      if (res.status === 200) {
        toast.success("Item added successfully");
        setQuantity(1);
        setItem({ product: id, quantity: 1 });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return {
    product,
    loading,
    error,
    selectedImageIndex,
    setSelectedImageIndex,
    quantity,
    addedToCart,
    handleQuantityChange,
    handleAddToCart,
  };
};
