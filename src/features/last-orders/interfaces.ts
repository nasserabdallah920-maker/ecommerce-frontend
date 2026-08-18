
import type { IOrderItem, IShippingAddress } from "../order/interfaces";
export interface Order {
  _id: { $oid: string } | string;
  user: { $oid: string } | string;
  items: IOrderItem[];
  couponCode?: string;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentStatus: "paid" | "unpaid" | "pending";
  orderStatus: "confirmed" | "pending" | "shipped" | "delivered" | "cancelled";
  paymob_id?: number;
  totalPrice: number;
  shipping: number;
  discount?: number;
  finalPrice: number;
  createdAt: { $date: string } | string;
  updatedAt?: { $date: string } | string;
}
