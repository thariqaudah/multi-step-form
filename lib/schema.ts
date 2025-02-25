import { z } from "zod";

export const InfoFormSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email_address: z.string().email({
    message: "Please enter a valid email",
  }),
  phone_number: z
    .string()
    .min(9, { message: "Please enter a valid phone number" }),
});

export const PlanFormSchema = z.object({
  type: z.enum(["arcade", "advanced", "pro"], {
    required_error: "You need to select a plan.",
  }),
  is_yearly: z.boolean(),
});

export const AddOnsFormSchema = z.object({
  add_ons: z.array(z.string()).min(0),
});

export type InfoFormT = z.infer<typeof InfoFormSchema>;
export type PlanFormT = z.infer<typeof PlanFormSchema>;
export type AddOnsFormT = z.infer<typeof AddOnsFormSchema>;
