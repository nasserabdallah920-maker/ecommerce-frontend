import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.services";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/auth/Redux/authSlice";
import { useState } from "react";

export const useLogout = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading]=useState<boolean>(false)
  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await logout();
      if (res.status === 200) {
        dispatch(deleteUser());
        nav("/");
      }
      return res;
    } catch (err) {
      console.error("Logout failed", err);
      dispatch(deleteUser());
      nav("/");
    }finally{setLoading(false)}
  };

  return { handleLogout,loading };
};
