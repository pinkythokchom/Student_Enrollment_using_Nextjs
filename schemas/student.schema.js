import { z } from "zod";

export const studentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters")
    .regex(/^[A-Za-z ]+$/, "Only letters and spaces allowed"),

  email: z.string().email("Invalid email address"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),

  classLevel: z.enum(["9", "10", "11", "12"], {
    required_error: "Select class",
  }),

  board: z.enum(["CBSE", "ICSE", "State Board"], {
    required_error: "Select board",
  }),

  language: z.enum(["English", "Hindi", "Hinglish"], {
    required_error: "Select preferred language",
  }),
});
