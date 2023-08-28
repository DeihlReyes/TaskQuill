import { promises as fs } from "fs"
import path from "path"
import { taskSchema } from "@/components/table-components/data/schema";
import { z } from "zod"

async function getTasks() {
    const data = await fs.readFile(
      path.join(process.cwd(), "/components/table-components/data/tasks.json")
    )
  
    const tasks = JSON.parse(data.toString())
  
    return z.array(taskSchema).parse(tasks)
  }

export const getTaskbyStatusCount = async () => {
    const tasks = await getTasks()
    const statusCount: { [status: string]: number } = {};
// Iterate through the tasks and count the tasks by status
    tasks.forEach((task) => {
        const status = task.status;
        if (statusCount[status]) {
            statusCount[status]++;
        } else {
            statusCount[status] = 1;
        }
    });

    console.log("This is the Status Count", statusCount);

    return statusCount;
}