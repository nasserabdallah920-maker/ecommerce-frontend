import { useState, useCallback } from "react";

import {
  blockUserById,
  deleteUserById,
  findAllUser,
  getUserById,
  searchUser,
} from "../../services/users.services";
import type { User } from "../users.interfaces";
import axios from "axios";
import { toast } from "react-toastify";

export function useUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await findAllUser();
      setUsers(res.data.data || res.data.users || res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching users");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const searchUsers = useCallback(async () => {
    if (!searchQuery.trim()) {
      getAllUsers();
      return;
    }

    setLoading(true);
    try {
      const res = await searchUser(searchQuery);
      setUsers(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error searching users");
      }
    } finally {
      setLoading(false);
    }
  }, [getAllUsers, searchQuery]);

  const getUserDetails = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getUserById(id);
      setSelectedUser(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Error fetching user details",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await deleteUserById(id);
      toast.success("User deleted successfully");
      await getAllUsers();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error deleting user");
      }
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id: string) => {
    setLoading(true);
    try {
      await blockUserById(id);
      toast.success("User status updated successfully");
      await getUserDetails(id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Error updating user status",
        );
      }
    } finally {
      setLoading(false);
    }
  };

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
    open,
    loading,
  };
}
