export interface IOrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  city: string;
  street: string;
  phone: string;
}

export type PaymentMethod = "cash" | "card" | "pending" | string;

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role?: string;
  isBlocked?: boolean;
  wishlist?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  refreshToken?: string;
}

export interface IOrder {
  _id: string;
  user: IOrderUser | string;
  items: IOrderItem[];
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: IShippingAddress;
  paymob_id?: number | null;
  discount: number;
  shipping: number;
  totalPrice: number;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
