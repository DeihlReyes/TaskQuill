import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is Required" })
    .max(100, { message: "Title is Too Long" }),
  description: z
    .string()
    .min(1, { message: "Description is Required" })
    .max(150, { message: "Description is Too Long" }),
  projectTag: z
    .string()
    .min(4, { message: "Project tag must be 4 characters" })
    .max(4, { message: "Project tag must be only 4 characters" })
    .toUpperCase(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
