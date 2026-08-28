import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../../products/products.interfaces";
import type { IAddToCartRequest } from "../../cart/cart.interfaces";
import { getProductById } from "../../products/products.services";
import { addToCart } from "../../cart/cart.services";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

export const useProductDetails = (id?: string) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const [item, setItem] = useState<IAddToCartRequest>({
    product: id,
    quantity: 1,
  });

  const queryClient = useQueryClient();
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );

  const {
    data: productResponse,
    isLoading: loading,
    error: errorObj,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  const product: IProduct | null = productResponse?.data?.data || productResponse?.data || productResponse || null;
  const error = errorObj ? errorObj.message : null;

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

  const addToCartMutation = useMutation({
    mutationFn: (cartItem: IAddToCartRequest) => addToCart(cartItem),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Item added successfully");
        setQuantity(1);
        setItem({ product: id, quantity: 1 });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    if (!userPayload.token) {
      toast.error("You must log in first.");
      return;
    }
    
    addToCartMutation.mutate(item);
  };

  return {
    product,
    loading: loading || addToCartMutation.isPending,
    error,
    selectedImageIndex,
    setSelectedImageIndex,
    quantity,
    addedToCart,
    handleQuantityChange,
    handleAddToCart,
  };
};
