import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Coupon,
  CreateCouponInput,
  INewCoupon,
} from "../coupon.interfaces";
import {
  findAllCoupons,
  findCouponById,
  createCoupon,
  editCouponById,
  deleteCouponById,
} from "../../services/coupon.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCouponsManagement() {
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [isShowSelected, setIsShowSelected] = useState<boolean>(false);
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const [coupon, setCoupon] = useState<INewCoupon>({
    code: "",
    type: "percentage",
    value: 0,
    minOrder: 0,
    maxDiscount: 0,
    expiresAt: "",
    usageLimit: 0,
    isActive: true,
  });

  const {
    data: couponsData,
    isLoading: isCouponsLoading,
    refetch: getAllCoupons,
  } = useQuery({
    queryKey: ["adminCoupons"],
    queryFn: findAllCoupons,
  });

  const coupons: Coupon[] = couponsData?.data?.data || [];

  const {
    data: couponDetailsData,
    isLoading: isCouponDetailsLoading,
    isSuccess: isCouponDetailsSuccess,
  } = useQuery({
    queryKey: ["adminCouponDetails", selectedCouponId],
    queryFn: () => findCouponById(selectedCouponId!),
    enabled: !!selectedCouponId,
  });

  useEffect(() => {
    if (isCouponDetailsSuccess && couponDetailsData?.data?.data) {
      const data = couponDetailsData.data.data;
      setCoupon({
        code: data.code,
        type: data.type,
        value: data.value,
        minOrder: data.minOrder,
        maxDiscount: data.maxDiscount,
        expiresAt: data.expiresAt,
        usageLimit: data.usageLimit,
        isActive: data.isActive,
        ...(isShowSelected ? { usedCount: data.usedCount } : {}),
      });
    }
  }, [isCouponDetailsSuccess, couponDetailsData, isShowSelected]);

  const getOneCoupon = (id: string, isShow: boolean) => {
    setSelectedCouponId(id);
    setIsShowSelected(isShow);
  };

  const createCouponMutation = useMutation({
    mutationFn: (couponData: CreateCouponInput) => createCoupon(couponData),
    onSuccess: () => {
      setCoupon({
        code: "",
        type: "percentage",
        value: 0,
        minOrder: 0,
        maxDiscount: 0,
        expiresAt: "",
        usageLimit: 0,
        isActive: true,
      });
      nav("/admin/coupons");
      toast.success("successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCoupons"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const editCouponMutation = useMutation({
    mutationFn: ({ id, couponData }: { id: string; couponData: CreateCouponInput }) =>
      editCouponById(id, couponData),
    onSuccess: (_, variables) => {
      toast.success("successfully");
      nav("/admin/coupons");
      setCoupon({
        code: "",
        type: "percentage",
        value: 0,
        minOrder: 0,
        maxDiscount: 0,
        expiresAt: "",
        usageLimit: 0,
        isActive: true,
      });
      queryClient.invalidateQueries({ queryKey: ["adminCoupons"] });
      queryClient.invalidateQueries({ queryKey: ["adminCouponDetails", variables.id] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const deleteCouponMutation = useMutation({
    mutationFn: (id: string) => deleteCouponById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCoupons"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "something error");
    },
  });

  const createNewCoupon = (couponData: CreateCouponInput) => {
    createCouponMutation.mutate(couponData);
  };

  const editCoupon = (id: string, couponData: CreateCouponInput) => {
    editCouponMutation.mutate({ id, couponData });
  };

  const deleteCoupon = (id: string) => {
    deleteCouponMutation.mutate(id);
  };

  const handleChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCoupon((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCoupon((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loading =
    isCouponsLoading ||
    isCouponDetailsLoading ||
    createCouponMutation.isPending ||
    editCouponMutation.isPending ||
    deleteCouponMutation.isPending;

  return {
    coupons,
    coupon,
    loading,
    getAllCoupons,
    getOneCoupon,
    createNewCoupon,
    editCoupon,
    deleteCoupon,
    setCoupon,
    handleChange,
    handleChangeNumber,
  };
}