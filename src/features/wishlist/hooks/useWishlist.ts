import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, addToWishlist, removeFromWishlist } from "../wishlist.services";
import type { RootState } from "../../../Redux/store";
import axios from "axios";

export const useWishlist = () => {
  const userPayload = useSelector((state: RootState) => state.authuser.initialState);
  const isCompleted = useSelector((state: RootState) => state.authuser.isCompleted);
  const queryClient = useQueryClient();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await getWishlist();
      return res.data.data.wishlist || [];
    },
    enabled: !!userPayload?.token && isCompleted,
  });

  const wishlistData = data || [];

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

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!isCompleted) {
        return Promise.reject(new Error("User profile is incomplete"));
      }
      return addToWishlist(productId);
    },
    onSuccess: () => {
      toast.success("Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : err.message || "Failed to add item to wishlist";
      toast.error(errorMessage);
    }
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!isCompleted) {
        return Promise.reject(new Error("User profile is incomplete"));
      }
      return removeFromWishlist(productId);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : err.message || "Failed to remove item from wishlist";
      toast.error(errorMessage);
    }
  });

  const toggleWishlist = async (productId: string) => {
    setActionLoading(productId);
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlistMutation.mutateAsync(productId);
      } else {
        await addToWishlistMutation.mutateAsync(productId);
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (productId: string) => {
    setActionLoading(productId);
    try {
      await removeFromWishlistMutation.mutateAsync(productId);
    } finally {
      setActionLoading(null);
    }
  };

  return {
    wishlistData,
    wishlistItems,
    loading,
    actionLoading,
    isInWishlist,
    toggleWishlist,
    handleRemove
  };
};