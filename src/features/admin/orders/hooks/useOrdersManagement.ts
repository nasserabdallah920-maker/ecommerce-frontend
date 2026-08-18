import { useState, useCallback } from "react";
import type { IOrder } from "../../../order/interfaces";
import {
  getAllOrdersAPI,
  getOneOrderAPI,
  changeOrderStatusAPI,
  getOrdersForUser,
} from "../../services/orders.services";
import axios from "axios";
import { toast } from "react-toastify";

export function useOrdersManagement() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllOrdersAPI();
      setOrders(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllOrdersForOne = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getOrdersForUser(id);
      setOrders(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getOneOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    try {
      const res = await getOneOrderAPI(orderId);
      setSelectedOrder(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setSelectedOrder(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const changeOrderStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      await changeOrderStatusAPI(orderId, status);
      toast.success("Order status updated successfully");
      await getAllOrders();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    selectedOrder,
    loading,
    getAllOrders,
    getOneOrder,
    changeOrderStatus,
    setSelectedOrder,
    getAllOrdersForOne,
  };
}