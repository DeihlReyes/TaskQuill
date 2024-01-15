import TaskTable from "@/components/task-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserTasks = () => {
  return (
    <>
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
          <TaskTable />
        </CardContent>
      </Card>
    </>
  );
};

export default UserTasks;
