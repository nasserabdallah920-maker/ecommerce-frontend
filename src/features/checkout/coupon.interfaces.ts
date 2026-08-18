export interface ICoupon {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  maxDiscount: number;
  minOrder: number;
  expiresAt: string; 
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}
