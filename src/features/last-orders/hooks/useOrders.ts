import { useCallback, useState } from "react";
import { getLastOrders } from "../services";
import type { Order } from "../interfaces";
import axios from "axios";
import { toast } from "react-toastify";

export const useOreders = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLastOrders();
      setOrders(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching orders");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { getOrders, orders, loading };
};