import { useState } from "react";
import type { ILoginCredentials } from "../auth.interfaces";
import { login } from "../auth.services";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validator } from "../../../utils/zodValidator";
import { loginSchema } from "../auth.validations";
import { useDispatch } from "react-redux";

import {saveUser} from '../Redux/authSlice'
export const useLogin = () => {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [state, setState] = useState<ILoginCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()


  const handleLogin = async (loginData: ILoginCredentials) => {
    setLoading(true);
    try {
      const res = await login(loginData);
      const data = res.data;

      dispatch(saveUser({
        id:data.user.userId,
        role:data.user.role,
        token:data.accessToken
      }))
      nav("/");
      toast.success("login successfully");
      return;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const check = validator(loginSchema, state);
    setLoading(true);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      setLoading(false);
      return;
    }
    try {
      await handleLogin(state);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (type: keyof ILoginCredentials, value: string) => {
    setError("");
    setState((prev) => ({ ...prev, [type]: value }));
  };

  return { handleLogin, error, state, loading, handleChange, handleSubmit };
};
