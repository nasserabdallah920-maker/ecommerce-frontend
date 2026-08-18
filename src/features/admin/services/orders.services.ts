import { Axios } from "../../../lib/axios";

const baseOrderAdmin = '/admin/orders';

export const getAllOrdersAPI = async () => {
  return await Axios.get(baseOrderAdmin);
};

export const getOneOrderAPI = async (orderId: string) => {
  return await Axios.get(`${baseOrderAdmin}/${orderId}`);
};

export const getOrdersForUser = async (orderId: string) => {
  return await Axios.get(`${baseOrderAdmin}/user/${orderId}`);
};

export const changeOrderStatusAPI = async (orderId: string, status: string) => {
  return await Axios.patch(`${baseOrderAdmin}/status/${orderId}`, { newStatus: status });
};