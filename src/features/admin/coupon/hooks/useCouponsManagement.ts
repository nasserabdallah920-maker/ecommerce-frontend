import { useState, useCallback } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();

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

  const getAllCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await findAllCoupons();
      setCoupons(res.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "something error");
        setCoupons([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getOneCoupon = useCallback(async (id: string, isShow: boolean) => {
    setLoading(true);
    try {
      const res = await findCouponById(id);
      const data = res.data.data;
      setCoupon({
        code: data.code,
        type: data.type,
        value: data.value,
        minOrder: data.minOrder,
        maxDiscount: data.maxDiscount,
        expiresAt: data.expiresAt,
        usageLimit: data.usageLimit,
        isActive: data.isActive,
      });
      if (isShow) {
        setCoupon((prev) => ({
          ...prev,
          usedCount: data.usedCount,
        }));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewCoupon = async (couponData: CreateCouponInput) => {
    setLoading(true);
    try {
      await createCoupon(couponData);
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  };

  const editCoupon = async (id: string, couponData: CreateCouponInput) => {
    setLoading(true);
    try {
      await editCouponById(id, couponData);
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    setLoading(true);
    try {
      await deleteCouponById(id);
      await getAllCoupons();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "something error");
      }
    } finally {
      setLoading(false);
    }
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