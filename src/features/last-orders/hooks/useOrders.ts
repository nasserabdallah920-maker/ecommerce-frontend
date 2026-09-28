import { useQuery } from "@tanstack/react-query";
import { getLastOrders } from "../services";
import type { Order } from "../interfaces";
import { toast } from "react-toastify";

export const useOreders = (enabled: boolean = true) => {
  const {
    data: ordersResponse,
    isLoading: loading,
    refetch: getOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["lastOrders"],
    queryFn: getLastOrders,
    enabled,
  });

  const orders: Order[] | undefined = ordersResponse?.data?.data;

  if (isError) {
    toast.error((error as any)?.response?.data?.message || "Error fetching orders");
  }

  return { getOrders, orders, loading };
};