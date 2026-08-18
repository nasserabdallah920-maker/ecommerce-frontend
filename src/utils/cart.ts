import type { ICartItem } from "../features/cart/cart.interfaces";

export const calculateSubtotal = (cartItems: ICartItem[]) => {
  if (!cartItems) {
    return 1;
  }
  const subtotal = cartItems
    .map((e) => e.product.price * e.quantity)
    .reduce((ele, cur) => {
      return ele + cur;
    }, 0);
  return subtotal;
};
