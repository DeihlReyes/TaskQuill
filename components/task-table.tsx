import { DataTable } from "./table-components/data-table";
import { columns } from "./table-components/columns";
import { getTasks } from "@/actions/get-task";
import { Task } from "@prisma/client";
import { profile } from "@/lib/profile";

const TaskTable = async ({ projectId }: { projectId?: string }) => {
  const currentProfile = await profile();
  let tasks: Task[] = [];

  if (!projectId) {
    tasks = await getTasks({ userId: currentProfile.id });
  } else {
    tasks = await getTasks({ projectId });
  }
  return <DataTable data={tasks} columns={columns} />;
};

export default TaskTable;
