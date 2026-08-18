export interface Coupon {
  _id: string;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  maxDiscount: number;
  minOrder: number;
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface INewCoupon {
  code: string;
  type: "fixed" | "percentage";
  value: number;
  maxDiscount: number;
  minOrder: number;
  expiresAt: string;
  usageLimit: number;
  isActive: boolean;
  usedCount?:number
}

export type CreateCouponInput = Omit<
  Coupon,
  "_id" | "usedCount" | "createdAt" | "updatedAt"
>;
export type UpdateCouponInput = Partial<CreateCouponInput>;
