import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  blockUserById,
  deleteUserById,
  findAllUser,
  getUserById,
  searchUser,
} from "../../services/users.services";
import type { User } from "../users.interfaces";
import { toast } from "react-toastify";

export function useUsersManagement() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: getAllUsers,
  } = useQuery({
    queryKey: ["adminUsers", searchQuery],
    queryFn: () => (searchQuery.trim() ? searchUser(searchQuery) : findAllUser()),
  });

  const users: User[] = usersData?.data?.data || usersData?.data?.users || usersData?.data || [];

  const {
    data: userDetailsData,
    isLoading: isUserDetailsLoading,
  } = useQuery({
    queryKey: ["adminUserDetails", selectedUserId],
    queryFn: () => getUserById(selectedUserId!),
    enabled: !!selectedUserId,
  });

  const selectedUser: User | null = userDetailsData?.data?.data || null;

  const getUserDetails = (id: string) => {
    setSelectedUserId(id);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUserById(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error deleting user");
    },
  });

  const blockUserMutation = useMutation({
    mutationFn: (id: string) => blockUserById(id),
    onSuccess: (_, id) => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      if (selectedUserId === id) {
        queryClient.invalidateQueries({ queryKey: ["adminUserDetails", id] });
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error updating user status");
    },
  });

  const deleteUser = (id: string) => deleteUserMutation.mutate(id);
  const blockUser = (id: string) => blockUserMutation.mutate(id);
  const searchUsers = () => { /* React Query automatically fetches on searchQuery change */ };

  const loading =
    isUsersLoading ||
    isUserDetailsLoading ||
    deleteUserMutation.isPending ||
    blockUserMutation.isPending;

  return {
    users,
    searchQuery,
    setSearchQuery,
    searchUsers,
    selectedUser,
    getUserDetails,
    deleteUser,
    getAllUsers,
    blockUser,
    loading,
  };
}
