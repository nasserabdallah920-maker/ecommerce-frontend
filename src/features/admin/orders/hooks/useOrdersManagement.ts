import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IOrder } from "../../../order/interfaces";
import {
  getAllOrdersAPI,
  getOneOrderAPI,
  changeOrderStatusAPI,
  getOrdersForUser,
} from "../../services/orders.services";
import { toast } from "react-toastify";

export function useOrdersManagement() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [userIdFilter, setUserIdFilter] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
  } = useQuery({
    queryKey: ["adminOrders", userIdFilter],
    queryFn: () => (userIdFilter ? getOrdersForUser(userIdFilter) : getAllOrdersAPI()),
  });

  const orders: IOrder[] = ordersData?.data?.data || [];

  const {
    data: orderDetailsData,
    isLoading: isOrderDetailsLoading,
  } = useQuery({
    queryKey: ["adminOrderDetails", selectedOrderId],
    queryFn: () => getOneOrderAPI(selectedOrderId!),
    enabled: !!selectedOrderId,
  });

  const selectedOrder: IOrder | null = orderDetailsData?.data?.data || null;

  const changeStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      changeOrderStatusAPI(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      if (selectedOrderId) {
        queryClient.invalidateQueries({ queryKey: ["adminOrderDetails", selectedOrderId] });
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const getAllOrders = () => {
    setUserIdFilter(null);
  };

  const getAllOrdersForOne = (id: string) => {
    setUserIdFilter(id);
  };

  const getOneOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const changeOrderStatus = (orderId: string, status: string) => {
    changeStatusMutation.mutate({ orderId, status });
  };

  const loading = isOrdersLoading || isOrderDetailsLoading || changeStatusMutation.isPending;

  return {
    orders,
    selectedOrder,
    loading,
    getAllOrders,
    getOneOrder,
    changeOrderStatus,
    setSelectedOrder: (order: IOrder | null) => setSelectedOrderId(order?._id || null),
    getAllOrdersForOne,
  };
}