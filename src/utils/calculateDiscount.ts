import type { ICoupon } from "../features/checkout/coupon.interfaces";

export const calculateDiscount = (price:number, coupon: ICoupon) => {
  const couponType = coupon.type;
  if (couponType === "percentage") {
    const percentage = coupon.value / 100;
    const discountIs = price * percentage;
    if (discountIs > coupon.maxDiscount) {
      const finalPrice = price - coupon.maxDiscount;
      return finalPrice;
    } else {
      const finalPrice = price - discountIs;
      return finalPrice;
    }
  }else if(couponType === "fixed"){
    const finalPrice = price-coupon.value
    return finalPrice
  }else{return price}
};

