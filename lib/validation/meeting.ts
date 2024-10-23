import { z } from "zod";

export const meetingSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is Required" })
    .max(100, { message: "Title is Too Long" }),
  description: z
    .string()
    .min(1, { message: "Description is Required" })
    .max(150, { message: "Description is Too Long" }),
  link: z.string().url({ message: "Link is Required" }),
  date: z.coerce.date({
    required_error: "A due date is required.",
  }),
});

export type MeetingSchema = z.infer<typeof meetingSchema>;
