import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { ILoginCredentials } from "../auth.interfaces";
import { login } from "../auth.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validator } from "../../../utils/zodValidator";
import { loginSchema } from "../auth.validations";
import { useDispatch } from "react-redux";
import { saveUser } from '../Redux/authSlice'

export const useLogin = () => {
  const nav = useNavigate();
  const [state, setState] = useState<ILoginCredentials>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: (loginData: ILoginCredentials) => login(loginData),
    onSuccess: (res) => {
      const data = res.data;
      dispatch(saveUser({
        id: data.user.userId,
        role: data.user.role,
        token: data.accessToken
      }));
      nav("/");
      toast.success("login successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "login failed");
    },
  });

  const handleLogin = (loginData: ILoginCredentials) => {
    loginMutation.mutate(loginData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const check = validator(loginSchema, state);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }
    
    loginMutation.mutate(state);
  };

  const handleChange = (type: keyof ILoginCredentials, value: string) => {
    setState((prev) => ({ ...prev, [type]: value }));
  };

  const error = loginMutation.error ? (loginMutation.error as any).response?.data?.message : "";

  return { 
    handleLogin, 
    error, 
    state, 
    loading: loginMutation.isPending, 
    handleChange, 
    handleSubmit 
  };
};
