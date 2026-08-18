import type { ICart, ICartItem } from "../features/cart/cart.interfaces";
export const calculateSubtotal = (cart: ICart) => {
  if (!cart?.items) return 0;
  return cart.items.reduce(
    (sum: number, item: ICartItem) => sum + item.product.price * item.quantity,
    0,
  );
};
