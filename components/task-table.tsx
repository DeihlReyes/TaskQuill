import { DataTable } from "./table-components/data-table";
import { columns } from "./table-components/columns";
import { getTasks } from "@/actions/get-task";

const TaskTable = async ({ projectId }: { projectId: string }) => {
  const tasks = await getTasks({ projectId });

  return (
      <DataTable data={tasks} columns={columns} />
  );
};

export default TaskTable;
