import axios from "axios";

import { store } from "../Redux/store";

import { deleteUser, saveToken } from "../features/auth/Redux/authSlice";
const API_URL = import.meta.env.VITE_API_BASE_URL;
export const Axios = axios.create({ baseURL: API_URL, withCredentials: true });
Axios.interceptors.request.use((config) => {
  const token = store.getState().authuser.initialState.token;

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;

      try {
        const response = await Axios.post("/auth/refresh");

        const accessToken = response.data.data.accessToken;
        store.dispatch(saveToken(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return Axios(originalRequest);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          store.dispatch(deleteUser());
        }
      }
    }
    return Promise.reject(error);
  },
);
