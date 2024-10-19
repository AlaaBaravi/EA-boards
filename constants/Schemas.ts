import { z } from "zod";

export const stepOneSchema = z.object({
  //   location: z.string().optional(),
  business_size: z.string().optional(),
  industry_type_id: z.number().optional(),
  username: z.string().optional(),
  files: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .optional(),
});

export const stepTwoSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be no more than 15 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  image: z
    .object({
      uri: z.string(),
      name: z.string(),
      type: z.string(),
    })
    .optional(),
  files: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .optional(),
});
