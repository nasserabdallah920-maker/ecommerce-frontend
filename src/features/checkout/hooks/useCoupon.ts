import { useState } from "react";
import { getCoupon } from "../checkout.services";
import { calculateDiscount } from "../../../utils/calculateDiscount";
import axios from "axios";
import { toast } from "react-toastify";

export const useCoupon = (subtotal?: number) => {
  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setPrice] = useState<number>();
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setLoading(true);
    try {
      const res = await getCoupon(couponCode);
      if (res.status === 200 && subtotal) {
        const coupon = res.data.data.coupon;
        const price = calculateDiscount(subtotal, coupon);
        setPrice(price);
        setDiscount(discount);
        setCouponApplied(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    finalPrice,
    discount,
    couponApplied,
    handleApplyCoupon,
    setCouponCode,
    couponCode,
    loading,
  };
};
