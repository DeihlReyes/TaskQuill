'use client'

import { DataTable } from "../table-components/data-table";
import { columns } from "../table-components/columns";
import useTasks from "@/hooks/use-tasks";
import { Task } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

const TaskTable = ({ projectId }: { projectId: string }) => {
  const { data, isLoading } = useTasks({projectId});
  console.log("ProjectID from task-table: ", projectId)
  let tasks: Task[] = [];

  if (data) {
    tasks = data as Task[];
  }

  return (
      isLoading ? <Skeleton className="h-[400px] md:h-[480px] w-full" /> : <DataTable data={tasks} columns={columns} />
  );
};

export default TaskTable;
