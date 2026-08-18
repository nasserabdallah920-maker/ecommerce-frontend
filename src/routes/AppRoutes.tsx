import { useRoutes } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Axios } from "../lib/axios";
import { deleteUser, saveUser } from "../features/auth/Redux/authSlice";

export default function AppRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await Axios.post("/auth/refresh");
        const data = res.data.data;
        dispatch(
          saveUser({
            role: data.user.role,
            id: data.user.userId,
            token: data.accessToken,
          }),
        );
      } catch {
        dispatch(deleteUser());
      }
    };
    refresh();
  }, [dispatch]);
  return useRoutes([...AuthRoutes, ...UserRoutes, ...AdminRoutes]);
}
