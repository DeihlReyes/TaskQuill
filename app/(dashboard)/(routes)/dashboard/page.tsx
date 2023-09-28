import { MeetingSidebar } from "@/components/meeting-sidebar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import TaskTable from "@/components/task-table";
import { getTaskCount } from "@/actions/get-task-count";
import { getTasks } from "@/actions/get-task";;

const Dashboard = async () => {
  const task = await getTasks();

  const taskStatusCount = getTaskCount({ tasks: task });

  return (
    <div className="md:p-8 p-6">
      <main className="flex flex-col md:flex-row md:justify-center md:gap-8">
        <div className="w-full md:w-3/4 flex flex-col gap-10">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {taskStatusCount.map((task) => (
              <Card
                  key={task.label}
                  className="md:w-52 w-40 text-center shadow-md dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 hover:scale-105 active:scale-100 transition-all ease-in-out"
              >
                  <CardHeader>
                      <CardTitle className="text-lg font-bold">{task.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <h1 className={cn("text-[40px] md:text-[50px] font-bold leading-none", task.color)}>
                          {task.count}
                      </h1>
                  </CardContent>
              </Card>
            ))}
          </div>
          <TaskTable />
        </div>
        <div className="hidden md:block w-1/4 h-full">
          <MeetingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;