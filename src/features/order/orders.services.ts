import { Axios } from "../../lib/axios";
import type { ICheckoutDetails } from "../checkout/interfaces";

export const getCoupon = async (couponcode: string) => {
  const coupon = await Axios.get(`/coupons/${couponcode}`);
  return coupon;
};

export const createOrder = async (body: ICheckoutDetails) => {
  const order = await Axios.post("/order/", body);
  return order;
};

export const findOrder = async (id: string) => {
  const order = await Axios.get(`/order/${id}`);
  return order;
};

export const confirmCashOrder = async (id: string) => {
  const order = await Axios.patch(`/order/cash/${id}`, {});
  return order;
};

export const PaymobLink = async (id: string) => {
  const order = await Axios.get(`/paymob/pay/${id}`);
  return order;
};

export const paymobPaidOrder = async (paymobId: string | number) => {
  const order = await Axios.get(`/order/lastpaid/${paymobId}`);
  return order;
};