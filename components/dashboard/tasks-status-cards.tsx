import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskStatus } from "@prisma/client";
import { Task } from "@/lib/validation/task";
import { ListChecks, FileClock, List, XCircle } from "lucide-react";


const TaskStatusCards = async ({ task }: {task: Task[]}) => {
  const taskCounts = (status: string) => {
    return task.filter((task: Task) => task.status === status).length;
  };


  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="bg-blue-500 text-white shadow-sm shadow-slate-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
          <CardTitle className="text-xs font-medium md:text-sm">Todo</CardTitle>
          <ListChecks className="h-6 w-6" />
        </CardHeader>
        <CardContent className="pb-3">
          <div className="mb-1 text-3xl font-bold leading-none md:text-5xl">
            {taskCounts(TaskStatus.TODO)}
          </div>
          <p className="text-xs text-white md:text-sm">Newly added tasks</p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-500 text-white shadow-sm shadow-slate-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
          <CardTitle className="text-xs font-medium md:text-sm">
            In progress
          </CardTitle>
          <FileClock className="h-6 w-6" />
        </CardHeader>
        <CardContent className="pb-3">
          <div className="mb-1 text-3xl font-bold leading-none md:text-5xl">
            {taskCounts(TaskStatus.IN_PROGRESS)}
          </div>
          <p className="text-xs text-white md:text-sm">On going tasks</p>
        </CardContent>
      </Card>
      <Card className="bg-green-500 text-white shadow-sm shadow-slate-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
          <CardTitle className="text-xs font-medium md:text-sm">
            Completed
          </CardTitle>
          <List className="h-6 w-6" />
        </CardHeader>
        <CardContent className="pb-3">
          <div className="mb-1 text-3xl font-bold leading-none md:text-5xl">
            {taskCounts(TaskStatus.DONE)}
          </div>
          <p className="text-xs text-white md:text-sm">Accomplished tasks</p>
        </CardContent>
      </Card>
      <Card className="bg-red-500 text-white shadow-sm shadow-slate-400">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
          <CardTitle className="text-xs font-medium md:text-sm">
            Cancelled
          </CardTitle>
          <XCircle className="h-6 w-6" />
        </CardHeader>
        <CardContent className="pb-3">
          <div className="mb-1 text-3xl font-bold leading-none md:text-5xl">
            {taskCounts(TaskStatus.CANCELLED)}
          </div>
          <p className="text-xs text-white md:text-sm">Cancelled tasks</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatusCards;
