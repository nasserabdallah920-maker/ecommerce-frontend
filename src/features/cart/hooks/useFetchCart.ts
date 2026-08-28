import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllItems,
  deleteItem,
  getCart,
  updateProduct,
} from "../cart.services";
import type { ICart } from "../cart.interfaces";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

export const useFetchCart = () => {
  const queryClient = useQueryClient();
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );

  const {
    data: cartResponse,
    isLoading: isCartLoading,
    refetch: fetchCart,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!userPayload.token,
    retry: false,
  });

  const cart: ICart | undefined = cartResponse?.data?.data?.cart;

  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, delta }: { productId: string; delta: number }) =>
      updateProduct(productId, delta),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("done");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId: string) => deleteItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("the product is removed");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => deleteAllItems(),
    onSuccess: (response) => {
      if (response.status === 204) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("the all product is removed");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const handleQuantityChange = (productId: string, delta: number) => {
    updateQuantityMutation.mutate({ productId, delta });
  };

  const handleRemoveItem = (productId: string) => {
    removeItemMutation.mutate(productId);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  const loading =
    isCartLoading ||
    updateQuantityMutation.isPending ||
    removeItemMutation.isPending ||
    clearCartMutation.isPending;

  return {
    loading,
    cart,
    fetchCart,
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
  };
};
