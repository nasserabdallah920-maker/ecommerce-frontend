import { Axios } from "../../../lib/axios";

const apiProdict = '/admin/products';

export interface updateProduct {
  title: string;
  description: string;
  stock: string;
  price: string;
}

export const createProduct = async (newProduct: FormData) => {
  const response = await Axios.post(`${apiProdict}/create`, newProduct);
  return response;
};

export const deleteProduct = async (id: string) => {
  const response = await Axios.delete(`${apiProdict}/delete/${id}`);
  return response;
};

export const deleteProductImage = async (productId: string, imagesName: string) => {
  const response = await Axios.delete(`${apiProdict}/delete/images/${productId}/${imagesName}`);
  return response;
};

export const addProductImage = async (productId: string, file: FormData) => {
  const response = await Axios.patch(`${apiProdict}/update/images/${productId}`, file);
  return response;
};

export const updateProductInfromation = async (id: string, productData: updateProduct) => {
  const response = await Axios.patch(`${apiProdict}/update/information/${id}`, productData);
  return response;
};