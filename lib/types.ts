import { Project, Task } from "@prisma/client";

export type ProjectWithTask = Project & {
  task: Task[];
};
