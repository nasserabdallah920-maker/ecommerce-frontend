import type { IAddToCartRequest } from "./cart.interfaces";
import { Axios } from "../../lib/axios";
export const getCart = async () => {
  const response = await Axios.get("/cart");
  return response;
};

export const addToCart = async (item: IAddToCartRequest) => {
  const response = await Axios.post("/cart", { item });
  return response;
};

export const deleteItem = async (id: string) => {
  const response = await Axios.delete(`/cart/${id}`);
  return response;
};
export const deleteAllItems = async () => {
  const response = await Axios.delete(`/cart/`);
  return response;
};
export const updateProduct = async (productId: string, quantity: number) => {
  const response = await Axios.patch(
    `/cart/${productId}?quantity=${quantity}`,
    {},
  );
  return response;
};
