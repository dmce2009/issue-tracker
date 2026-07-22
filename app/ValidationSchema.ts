import z from "@/node_modules/zod/v3/external.cjs";

const Max_Characters = 65535;

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(Max_Characters).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(Max_Characters)
    .optional(),
  assignedUser: z
    .string()
    .min(1, "Assigne User id  is required")
    .optional()
    .nullable(),
});
