import { DataTable } from "./table-components/data-table";
import { columns } from "./table-components/columns";
import { getTasks } from "@/actions/get-task";
import { Task } from "@prisma/client";

const TaskTable = async (
  { projectId }: { projectId?: string }
) => {

  let tasks: Task[] = [];

  if (!projectId) {
    tasks = await getTasks();
  } else {
    tasks = await getTasks({ projectId });
  }
  return (
      <DataTable data={tasks} columns={columns} />
  );
};

export default TaskTable;
