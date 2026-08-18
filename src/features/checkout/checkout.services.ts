import { Axios } from "../../lib/axios";
import type { ICheckoutDetails } from "./interfaces";

export const getCoupon = async (couponcode: string) => {
  const coupon = await Axios.get(`/coupons/${couponcode}`);
  return coupon;
};

export const createOrder = async (checkoutDetails: ICheckoutDetails) => {
  const order = await Axios.post("/order/", checkoutDetails);
  return order;
};

export const getOreder = async (id: string) => {
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

export const paymobPaid = async () => {
  const order = await Axios.get("/order/last-paid/user");
  return order;
};