import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is Required" }).max(100, { message: "Title is Too Long" }),
  description: z.string().min(1, { message: "Description is Required" }).max(150, { message: "Description is Too Long" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  label: z.enum(["BUG", "FEATURE", "IMPROVEMENT", "REFACTOR", "TEST", "DOCUMENTATION"]),
  projectId: z.string().min(1),
  dueDate: z.coerce.date({
    required_error: "A due date is required.",
  }),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const updateTaskSchema = taskSchema.extend({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]),
});
