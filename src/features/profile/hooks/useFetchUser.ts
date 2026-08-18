import axios from "axios";
import { useCallback, useState } from "react";
import { getUser, updateUser } from "../users.services";
import { toast } from "react-toastify";
import type { IProfileForm } from "../interfaces";
import { validator } from "../../../utils/zodValidator";
import { userInformationValidate } from "../profile.validations";

export const useFetchUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUser();
      setForm({
        firstName: res.data?.data.firstName || "",
        lastName: res.data?.data.lastName || "",
        email: res.data?.data.email || "",
        phoneNumber: res.data?.data.phoneNumber || "",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching user data");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendNewData = async () => {
    const check = validator(userInformationValidate, form);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }

    setLoading(true);
    try {
      await updateUser(form);
      toast.success("The data was successfully updated");
      setIsEditing(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    loading,
    fetchUser,
    handleChange,
    sendNewData,
    form,
    setForm,
  };
};