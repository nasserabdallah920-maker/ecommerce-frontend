import { useCallback, useState } from "react";
import { confirmCashOrder, findOrder, PaymobLink, paymobPaidOrder } from "../orders.services";
import type { IOrder } from "../interfaces";
import axios from "axios";
import { toast } from "react-toastify";

export const useOrder = () => {
  const [isPaymobLoading, setIsPaymobLoading] = useState(false);
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  const getOrder = useCallback(async (orderId?: string, paymobId?: string) => {
    setLoading(true);
    try {
      if (paymobId) {
        const res = await paymobPaidOrder(paymobId);
        setOrder(res.data.data.order[0]);
      } else if (orderId) {
        const res = await findOrder(orderId);
        setOrder(res.data.data.order);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error fetching order");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePaymobClick = async (orderId: string) => {
    setIsPaymobLoading(true);
    setLoading(true);
    try {
      const res = await PaymobLink(orderId);
      if (res.status === 200) {
        window.location.href = res.data.data.url;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error processing payment");
      }
    } finally {
      setIsPaymobLoading(false);
      setLoading(false);
    }
  };

  const handleCashClick = async (orderId: string) => {
    setIsCashLoading(true);
    setLoading(true);
    try {
      const res = await confirmCashOrder(orderId);
      setOrder(res.data.data.order);
      toast.success("Cash order confirmed successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error confirming order");
      }
    } finally {
      setIsCashLoading(false);
      setLoading(false);
    }
  };

  return {
    getOrder,
    order,
    handleCashClick,
    handlePaymobClick,
    isCashLoading,
    isPaymobLoading,
    loading,
  };
};