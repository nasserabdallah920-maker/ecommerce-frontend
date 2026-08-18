import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Email must be at least 6 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  phoneNumber: z.string().min(10, { message: "Phone number is too short" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const changePasswordValidate = z
  .object({
oldPassword: z
  .string()
  .min(8, "Old password must be at least 8 characters")
  .max(100, "Old password must not exceed 100 characters"),

newPassword: z
  .string()
  .min(8, "New password must be at least 8 characters")
  .max(100, "New password must not exceed 100 characters"),

confirmPassword: z
  .string()
  .min(8, "Confirm password must be at least 8 characters")
  .max(100, "Confirm password must not exceed 100 characters"),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

