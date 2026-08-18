import type { IShippingAddress } from "../order/interfaces";

export interface ICheckoutDetails {
  shippingAddress: IShippingAddress;
  couponCode?: string;
}
