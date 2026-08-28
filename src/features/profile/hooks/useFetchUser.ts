import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "../users.services";
import { toast } from "react-toastify";
import type { IProfileForm } from "../interfaces";
import { validator } from "../../../utils/zodValidator";
import { userInformationValidate } from "../profile.validations";

export const useFetchUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<IProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const queryClient = useQueryClient();

  const {
    data: userResponse,
    isLoading: isFetchingUser,
    refetch: fetchUser,
    isSuccess
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (isSuccess && userResponse?.data?.data) {
      setForm({
        firstName: userResponse.data.data.firstName || "",
        lastName: userResponse.data.data.lastName || "",
        email: userResponse.data.data.email || "",
        phoneNumber: userResponse.data.data.phoneNumber || "",
      });
    }
  }, [isSuccess, userResponse]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserMutation = useMutation({
    mutationFn: (formData: IProfileForm) => updateUser(formData),
    onSuccess: () => {
      toast.success("The data was successfully updated");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  });

  const sendNewData = () => {
    const check = validator(userInformationValidate, form);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        toast.error(`${issue.message}`);
      });
      return;
    }
    updateUserMutation.mutate(form);
  };

  return {
    isEditing,
    setIsEditing,
    loading: isFetchingUser || updateUserMutation.isPending,
    fetchUser,
    handleChange,
    sendNewData,
    form,
    setForm,
  };
};