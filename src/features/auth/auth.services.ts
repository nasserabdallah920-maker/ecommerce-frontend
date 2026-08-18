import { Axios } from "../../lib/axios";
import type { ILoginCredentials, ISignupData } from "./auth.interfaces";

export const login = async (data: ILoginCredentials) => {
  
  const response = await Axios.post("/auth/login", data);
  return response;

};

export const signup = async (data: ISignupData) => {
  
  const response = await Axios.post("/auth/register", data);

  return response;

};

export const logout = async () => {

  const response = await Axios.post("/auth/logout", {});
  return response;

};
