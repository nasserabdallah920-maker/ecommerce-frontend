import z from 'zod'
export const userInformationValidate = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters")
      .optional(),

    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters")
      .optional(),

    email: z
      .string()
      .email("Invalid email address")
      .optional(),

    phoneNumber: z
      .string()
      .optional(),
  })
  .strict();