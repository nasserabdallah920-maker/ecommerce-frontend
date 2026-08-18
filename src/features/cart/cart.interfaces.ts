import type { IProduct } from "../products/products.interfaces";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: ICartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddToCartRequest {
  product?: string;
  quantity: number;
}