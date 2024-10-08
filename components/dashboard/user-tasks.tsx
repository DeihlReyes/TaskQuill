import { getTasks } from "@/actions/get-task";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "../table-components/columns";
import { DataTable } from "../table-components/data-table";
import { Task } from "@/lib/validation/task";
import TaskStatusCards from "./tasks-status-cards";

const UserTasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="space-y-5">
      <TaskStatusCards task={tasks} />
      <Card className="shadow-sm shadow-slate-400">
        <CardHeader>
          <CardTitle className="text-base font-bold tracking-wide">
            My Tasks
          </CardTitle>
          <CardDescription className="text-xs">
            List of your Tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full pb-4">
          <DataTable data={tasks} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTasks;
