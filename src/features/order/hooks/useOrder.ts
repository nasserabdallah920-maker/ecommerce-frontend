import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmCashOrder, findOrder, PaymobLink, paymobPaidOrder } from "../orders.services";
import type { IOrder } from "../interfaces";
import { toast } from "react-toastify";

export const useOrder = (orderId?: string, paymobId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: orderResponse,
    isLoading: isOrderLoading,
    refetch: getOrder,
  } = useQuery({
    queryKey: ["order", orderId, paymobId],
    queryFn: async () => {
      if (paymobId) {
        return paymobPaidOrder(paymobId);
      } else if (orderId) {
        return findOrder(orderId);
      }
      return null;
    },
    enabled: !!orderId || !!paymobId,
  });

  const order: IOrder | null = paymobId 
    ? orderResponse?.data?.data?.order?.[0] || null 
    : orderResponse?.data?.data?.order || null;

  const paymobMutation = useMutation({
    mutationFn: (id: string) => PaymobLink(id),
    onSuccess: (res) => {
      if (res.status === 200) {
        window.location.href = res.data.data.url;
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error processing payment");
    },
  });

  const cashMutation = useMutation({
    mutationFn: (id: string) => confirmCashOrder(id),
    onSuccess: (res) => {
      queryClient.setQueryData(["order", orderId, paymobId], res);
      toast.success("Cash order confirmed successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Error confirming order");
    },
  });

  const handlePaymobClick = (id: string) => {
    paymobMutation.mutate(id);
  };

  const handleCashClick = (id: string) => {
    cashMutation.mutate(id);
  };

  const loading = isOrderLoading || paymobMutation.isPending || cashMutation.isPending;

  return {
    getOrder,
    order,
    handleCashClick,
    handlePaymobClick,
    isCashLoading: cashMutation.isPending,
    isPaymobLoading: paymobMutation.isPending,
    loading,
  };
};