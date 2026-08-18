import { Axios } from "../../lib/axios";
import type { IProfileForm } from "./interfaces";

export const getUser = async () => {
  const response = await Axios.get(`/users/get/me`);
  return response;
};

export const updateUser = async (data: IProfileForm) => {
  const response = await Axios.patch(`/users/update/information/me`, data);
  return response;
};