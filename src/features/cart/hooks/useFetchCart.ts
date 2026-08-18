import { useCallback, useState } from "react";
import {
  deleteAllItems,
  deleteItem,
  getCart,
  updateProduct,
} from "../cart.services";
import type { ICart } from "../cart.interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

export const useFetchCart = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [cart, setCart] = useState<ICart | undefined>();
  const userPayload = useSelector(
    (state:RootState) => state.authuser.initialState,
  );
  const fetchCart = useCallback(async () => {
    if (!userPayload.token) return;
    try {
      setLoading(true);

      const response = await getCart();
      setCart(response.data?.data.cart);
    } catch (err) {
      if (axios.isAxiosError(err)) {

        toast.error(
          err.response?.data?.message || "Failed to load shopping cart",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [userPayload]);

  const handleQuantityChange = async (productId: string, delta: number) => {
    setLoading(true);
    try {
      const response = await updateProduct(productId, delta);
      if (response.status === 200) {
        fetchCart();
        toast.success("done");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setLoading(true);
    try {
      await deleteItem(productId);
      fetchCart();
      toast.success("the product is removed");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      const response = await deleteAllItems();
      if (response.status === 204) {
        fetchCart();
        toast.success("the all product is removed");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    cart,
    fetchCart,
    handleClearCart,
    handleQuantityChange,
    handleRemoveItem,
  };
};
