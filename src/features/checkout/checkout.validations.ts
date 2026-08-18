import z from 'zod'

export const checkoutSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(3, "City must be at least 3 characters"),
    street: z.string().min(3, "Street must be at least 3 characters"),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
  }),
  couponCode: z
    .string()
    .min(3, "Coupon code must be at least 3 characters").optional(),
});