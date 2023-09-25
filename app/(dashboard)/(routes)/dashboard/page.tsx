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
import { getTasks } from "@/actions/get-task";
import { DataTable } from "@/components/table-components/data-table";
import { columns } from "@/components/table-components/columns";


const Dashboard = async () => {
  const task = await getTasks();

  const taskStatusCount = getTaskCount({ tasks: task });

  return (
    <div>
      <main className="flex flex-col md:flex-row md:justify-center md:gap-8 p-4">
        <div className="w-full md:w-3/4">
          <div className="flex flex-wrap md:flex-row gap-4 justify-evenly md:justify-between items-center">
            {taskStatusCount.map((task) => (
              <Card
                  key={task.label}
                  className="w-40 md:w-52 text-center shadow-md dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 hover:scale-105"
              >
                  <CardHeader>
                      <CardTitle className="text-lg font-bold">{task.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <h1 className={cn("text-3xl md:text-5xl font-bold", task.color)}>
                          {task.count}
                      </h1>
                  </CardContent>
              </Card>
            ))}
          </div>
          <div className="py-12">
            <DataTable data={task} columns={columns} />
          </div>
        </div>
        <div className="hidden md:block w-1/4 h-full">
          <MeetingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;