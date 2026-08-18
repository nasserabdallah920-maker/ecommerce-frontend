import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistThunk, getWishlist, removeFromWishlistThunk } from "../Redux/wishlistSlice";
import type { RootState, AppDispatch } from "../../../Redux/store";

export const useWishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistData = useSelector((state: RootState) => state.wishlist.list);
  const status = useSelector((state: RootState) => state.wishlist.status);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getWishlist());
    }
  }, [dispatch, status]);

  const getWishlistIds = () => {
    if (!Array.isArray(wishlistData)) return [];
    return wishlistData.map((item: { _id?: string; product?: { _id?: string } | string } | string) => {
      if (typeof item === 'string') return item;
      if (item.product && typeof item.product === 'string') return item.product;
      if (item.product && typeof item.product === 'object' && item.product._id) return item.product._id;
      if (item._id) return item._id;
      return item;
    }).filter(Boolean);
  };

  const wishlistItems = getWishlistIds();

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  const toggleWishlist = async (productId: string) => {
    setActionLoading(productId);
    try {
      if (isInWishlist(productId)) {
        await dispatch(removeFromWishlistThunk(productId)).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addToWishlistThunk(productId)).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
      toast.error("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (productId: string) => {
    setActionLoading(productId);
    try {
      await dispatch(removeFromWishlistThunk(productId)).unwrap();
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove item");
    } finally {
      setActionLoading(null);
    }
  };

  return {
    wishlistItems,
    loading: status === "loading",
    actionLoading,
    isInWishlist,
    toggleWishlist,
    handleRemove
  };
};