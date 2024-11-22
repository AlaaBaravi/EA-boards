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
    kind: z.enum(["paper", "digital"]),
    name: z.string().optional(),
    start_date_crowded: z.date().optional(),
    end_date_crowded: z.date().optional(),
    price_on_regular: z.string().optional(),
    price_on_crowded: z.string().optional(),
    number_booking_day: z.coerce.number().optional(),
    video_length: z.string().optional(),
    video_repetition: z.string().optional(),
    billboard_description: z.string().optional(),
    location_description: z.string().optional(),
    width_description: z.string().optional(),
    height_description: z.string().optional(),
    reach_from_description: z.string().optional(),
    reach_to_description: z.string().optional(),
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
      if (!data.video_length) {
        ctx.addIssue({
          code: "custom",
          path: ["video_length"],
          message: "video length is required for digital.",
        });
      }
      if (!data.video_repetition) {
        ctx.addIssue({
          code: "custom",
          path: ["video_repetition"],
          message: "video repetition is required for digital.",
        });
      }
    }
  });
export type BillboardFormData = z.infer<typeof addBillboardSchema>;

export const editBillboardFormSchema = z.object({
  billboard_id: z.coerce.number().positive().int().nonnegative(),
  title: z.string(),
  name: z.string(),
  price_on_day: z.string(),
  location: z.string().optional(),
  region_id: z.number().optional(),
  billboard_type_id: z.number().optional(),
  reviews: z.coerce.number().optional(),
  status: z.string().optional(),
  kind: z.string().optional(),
  video_length: z.string().optional(),
  video_repetition: z.string().optional(),
  number_booking_day: z.coerce.number().optional(),
  billboard_description: z.string().optional(),
  location_description: z.string().optional(),
  width_description: z.string().optional(),
  height_description: z.string().optional(),
  reach_from_description: z.string().optional(),
  reach_to_description: z.string().optional(),
  // files: z.array(
  //   z.object({
  //     uri: z.string(),
  //     name: z.string(),
  //     type: z.string(),
  //   })
  // ),

  // images_deleted: z.array(z.number()).optional(),
});
export type EditBillboardFormData = z.infer<typeof editBillboardFormSchema>;

export const profileSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  business_size: z.string().optional(),
  industry_type_id: z.coerce.number().optional(),
  username: z.string().optional(),
  max_booking_days: z.number().optional(),
  min_booking_days: z.number().optional(),
  numbers_billboards: z.number().optional(),
  image: z.any().optional(),
});
export type ProfileFormData = z.infer<typeof profileSchema>;

export const filterBillboardsSchema = z.object({
  company_id: z.coerce.number().optional(),
  billboard_type_id: z.coerce.number().optional(),
  region_id: z.coerce.number().optional(),
  kind: z.string().optional(),
});
export type FilterBillboardsFormData = z.infer<typeof filterBillboardsSchema>;

export const sendFeedbackSchema = z.object({
  title: z.string(),
  email: z.string().email("Enter a valid email"),
  text: z.string().max(100, { message: "The maximum characters is 100" }),
});
export type FeedbackFormInputs = z.infer<typeof sendFeedbackSchema>;
