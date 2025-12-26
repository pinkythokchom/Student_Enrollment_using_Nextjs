import { z } from "zod";

export const academicSchema = z
  .object({
    subjects: z.array(z.string()).min(2, "Select at least 2 subjects"),

    goal: z.enum(
      ["Board Excellence", "Concept Mastery", "Competitive Prep"],
      { required_error: "Select exam goal" }
    ),

    hours: z
      .number({ invalid_type_error: "Enter weekly hours" })
      .min(1, "Minimum 1 hour")
      .max(40, "Maximum 40 hours"),

    scholarship: z.boolean(),

    percentage: z
      .number()
      .min(0)
      .max(100)
      .optional(),

    achievements: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.scholarship) {
        return data.percentage !== undefined;
      }
      return true;
    },
    {
      message: "Percentage required for scholarship",
      path: ["percentage"],
    }
  );
