import { Axios } from "../../../lib/axios";

const baseUsersAdmin = "/admin/users";

export const findAllUser = async () => {
  const response = await Axios.get(`${baseUsersAdmin}/getall`);
  return response;
};

export const searchUser = async (search: string) => {
  const response = await Axios.get(`${baseUsersAdmin}/search?search=${search}`);
  return response;
};

export const getUserById = async (id: string) => {
  const response = await Axios.get(`${baseUsersAdmin}/get/${id}`);
  return response;
};

export const deleteUserById = async (id: string) => {
  const response = await Axios.delete(`${baseUsersAdmin}/delete/${id}`);
  return response;
};

export const blockUserById = async (id: string) => {
  const response = await Axios.patch(`${baseUsersAdmin}/block/${id}`);
  return response;
};