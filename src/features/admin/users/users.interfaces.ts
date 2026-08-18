export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  isBlocked: boolean;
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string | null;
}
