import { MeetingSidebar } from "@/components/meeting-sidebar"
import { DataTable } from "@/components/table-components/data-table";
import { promises as fs } from "fs"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils";
import path from "path"
import { taskSchema } from "@/components/table-components/data/schema";
import { columns } from "@/components/table-components/columns"
import { getTaskbyStatusCount } from "@/hooks/getTasks";


const tasksCount: any = async() => { 
  const taskCounter = await getTaskbyStatusCount()
  console.log("This is the taskcounter", taskCounter)
  const inProgress = taskCounter["in progress"]
  const { todo, done, canceled } = taskCounter


  const Tasks = [
    {
      title: 'Todo',
      items: todo,
      color: 'text-blue-500',
    },
    {
      title: 'In Progress',
      items: inProgress,
      color: 'text-yellow-500',
    },
    {
      title: 'Completed',
      items: done,
      color: 'text-green-500',
    },
    {
      title: 'Cancelled',
      items: canceled,
      color: 'text-red-500',
    }
  ]

  return Tasks;
};


async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/components/table-components/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export const Home = async () => {
  const tasks = await getTasks()
  const TaskData = await tasksCount()

    return (
      <div>
        <main className="flex flex-row md:p-8 gap-8">
          <div>
            <div className="flex flex-row gap-4 w-full justify-between">
              {TaskData.map((task: any) => (
                <Card key={null} className="w-52 text-center shadow-md shadow-[#0d0d0d]/20 hover:scale-105">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h1 className={cn("md:text-5xl font-bold", task.color)}>{task.items}</h1>
                    </CardContent>
                </Card>
              ))}
            </div>
            <div className="py-12">
              <DataTable data={tasks} columns={columns} />
            </div>
          </div>
          <div className="hidden h-full md:flex md:w-64 md:flex-col z-80">
            <MeetingSidebar/>
          </div>
        </main>
      </div>
    )
}

export default Home;
  