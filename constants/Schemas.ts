import { z } from "zod";

export const signupFormSchema = z.object({
  type: z.enum(["company", "individual"]),
  username: z.string().optional(),
  industry_type_id: z.number().optional(),
  location: z.string().optional(),
  business_size: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be no more than 15 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  image: z.string().url().optional(),
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

export type FormValues = z.infer<typeof signupFormSchema>;

export const addBillboardSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    region_id: z.number(),
    billboard_type_id: z.number(),
    name: z.string().optional(),
    kind: z.enum(["paper", "digital"]),
    start_date_crowded: z.string().optional(),
    end_date_crowded: z.string().optional(),
    price_on_regular: z.string().optional(),
    price_on_crowded: z.string().optional(),
    number_booking_day: z.number().optional(),
    video_length: z.string().optional(),
    video_repetition: z.string().optional(),
    description: z.string().optional(),
    reviews: z.string().optional(),
    files: z.array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.kind === "digital") {
      if (!data.price_on_crowded) {
        ctx.addIssue({
          code: "custom",
          path: ["price_on_crowded"],
          message: "price on crowded is required for digital.",
        });
      }
      if (!data.price_on_regular) {
        ctx.addIssue({
          code: "custom",
          path: ["price_on_regular"],
          message: "price on regular is required for digital.",
        });
      }
      if (!data.start_date_crowded) {
        ctx.addIssue({
          code: "custom",
          path: ["start_date_crowded"],
          message: "start date crowded is required for digital.",
        });
      }
      if (!data.end_date_crowded) {
        ctx.addIssue({
          code: "custom",
          path: ["end_date_crowded"],
          message: "end date crowded is required for digital.",
        });
      }
      if (!data.number_booking_day) {
        ctx.addIssue({
          code: "custom",
          path: ["number_booking_day"],
          message: "number of booking day is required for digital.",
        });
      }
      // if (!data.video_length) {
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["video_length"],
      //     message: "video length is required for digital.",
      //   });
      // }
      // if (!data.video_repetition) {
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["video_repetition"],
      //     message: "video repetition is required for digital.",
      //   });
      // }
    }
  });

export type BillboardFormData = z.infer<typeof addBillboardSchema>;
