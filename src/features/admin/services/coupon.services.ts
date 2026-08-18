import { Axios } from "../../../lib/axios";
import type { CreateCouponInput, UpdateCouponInput } from "../coupon/coupon.interfaces";

const couponBaseApi = '/admin/coupons';

export const findAllCoupons = async () => {
  return await Axios.get(`${couponBaseApi}`);
};

export const findCouponById = async (id: string) => {
  return await Axios.get(`${couponBaseApi}/${id}`);
};

export const createCoupon = async (couponData: CreateCouponInput) => {
  return await Axios.post(`${couponBaseApi}`, couponData);
};

export const editCouponById = async (id: string, updateData: UpdateCouponInput) => {
  return await Axios.patch(`${couponBaseApi}/${id}`, updateData);
};

export const deleteCouponById = async (id: string) => {
  return await Axios.delete(`${couponBaseApi}/${id}`);
};