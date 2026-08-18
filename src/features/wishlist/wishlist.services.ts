import { Axios } from "../../lib/axios";

export const getWishlist = async () => {
  const response = await Axios.get("/users/wishlist");
  return response;
};

export const addToWishlist = async (productId: string) => {
  const response = await Axios.post(`/users/wishlist/${productId}`);
  return response;
};

export const removeFromWishlist = async (productId: string) => {
  const response = await Axios.delete(`/users/wishlist/${productId}`);
  return response;
};
