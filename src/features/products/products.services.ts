import { Axios } from "../../lib/axios";

export const getAllProducts = async (page?: number, limit?: number) => {
  const response = await Axios.get(`/products?page=${page}&limit=${limit}`);
  return response;
};

export const getProductById = async (id: string) => {
  const response = await Axios.get(`/products/${id}`);
  return response;
};

export const getProductByCategoryId = async (id: string) => {
  const response = await Axios.get(`/products/category/${id}`);
  return response;
};