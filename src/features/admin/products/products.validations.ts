import z from 'zod'
export const createProductValidation = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.string().transform(Number).pipe(z.number().min(0, "Price cannot be negative")),
  stock: z.string().transform(Number).pipe(z.number().min(0, "Stock cannot be negative")),
  category: z.string().min(10,"Category is required"),
});
