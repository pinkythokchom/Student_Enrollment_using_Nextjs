import { z } from "zod";

export const addressSchema = z.object({
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Enter valid 6-digit PIN code"),

  state: z
    .string()
    .min(2, "State is required"),

  city: z
    .string()
    .min(2, "City is required"),

  addressLine: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(120, "Address must be under 120 characters"),

  guardianName: z
    .string()
    .min(2, "Guardian name is required"),

  guardianMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid guardian mobile number"),

  paymentPlan: z.enum(
    ["Quarterly", "Half-Yearly", "Annual"],
    { required_error: "Select a payment plan" }
  ),

  paymentMode: z.enum(
    ["UPI", "Card", "NetBanking"],
    { required_error: "Select payment mode" }
  ),
});
