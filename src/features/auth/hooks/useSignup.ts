import { useReducer, useState } from "react";
import type { ISignupData, SignupAction } from "../auth.interfaces";
import { signup } from "../auth.services";

import { toast } from "react-toastify";
import axios from "axios";
import { signupReducer } from "../../../utils/signupReducer";
import { useNavigate } from "react-router-dom";
import { validator } from "../../../utils/zodValidator";
import { signupSchema } from "../auth.validations";
import { saveUser } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

export const useSignup = () => {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(signupReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatchRedux = useDispatch();
  const handleSignup = async (signupData: ISignupData) => {
    try {
      setLoading(true);
      const res = await signup(signupData);
      if (res.status === 201 && res.data.success === "success") {
        const data = res.data;
        dispatchRedux(
          saveUser({
            id: data.user.userId,
            role: data.user.role,
            token: data.accessToken,
          }),
        );
        toast.success("Account created successfully");
        nav("/");
        return res;
      }
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
    const check = validator(signupSchema, state);

    setLoading(true);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      setLoading(false);
      return;
    }

    try {
      await handleSignup(state);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
        setError(err.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (type: SignupAction["type"], value: string) => {
    setError("");
    dispatch({ type, value });
  };

  return { handleChange, error, loading, handleSubmit };
};
