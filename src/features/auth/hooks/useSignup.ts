import { useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import type { ISignupData, SignupAction } from "../auth.interfaces";
import { signup } from "../auth.services";
import { toast } from "react-toastify";
import { signupReducer } from "../../../utils/signupReducer";
import { useNavigate } from "react-router-dom";
import { validator } from "../../../utils/zodValidator";
import { signupSchema } from "../auth.validations";
import { saveUser } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

export const useSignup = () => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(signupReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const dispatchRedux = useDispatch();

  const signupMutation = useMutation({
    mutationFn: (signupData: ISignupData) => signup(signupData),
    onSuccess: (res) => {
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
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Signup failed");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validator(signupSchema, state);

    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }

    signupMutation.mutate(state);
  };

  const handleChange = (type: SignupAction["type"], value: string) => {
    dispatch({ type, value });
  };

  const error = signupMutation.error ? (signupMutation.error as any).response?.data?.message : "";

  return { handleChange, error, loading: signupMutation.isPending, handleSubmit };
};
