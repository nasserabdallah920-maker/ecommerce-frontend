import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services";
import { validator } from "../../../../utils/zodValidator";
import { changePasswordValidate } from "../../auth.validations";
import { toast } from "react-toastify";
import type { IChangePasswordRequest } from "../../auth.interfaces";

export const useChangePassword = () => {
  const [formData, setFormData] = useState<IChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const changePasswordMutation = useMutation({
    mutationFn: (data: IChangePasswordRequest) => changePassword(data),
    onSuccess: () => {
      setStatus({ type: "success", message: "Password updated successfully!" });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
      setStatus({ type: "error", message: err.response?.data?.message || "Failed to update password" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const check = validator(changePasswordValidate, formData);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }
    
    changePasswordMutation.mutate(formData);
  };

  return {
    handleChange,
    handleSubmit,
    formData,
    showConfirm,
    showNew,
    showOld,
    setFormData,
    setShowConfirm,
    setShowNew,
    setShowOld,
    status,
    setStatus,
    loading: changePasswordMutation.isPending
  };
};
