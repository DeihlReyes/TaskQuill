import { getTasks } from "@/actions/get-task";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Task, TaskStatus } from "@prisma/client";
import { ListChecks, FileClock, List, XCircle } from "lucide-react";
  
const TaskStatusCards = async ({task}: any) => {
    
    const taskCounts = (status: string) => {
        return task.filter((task: Task) => task.status === status).length;
    };

    return(
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 w-full">
            <Card className="bg-blue-500 text-white shadow-sm shadow-slate-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Todo
                    </CardTitle>
                    <ListChecks className="h-6 w-6"/>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="text-5xl leading-none font-bold mb-1">{taskCounts(TaskStatus.TODO)}</div>
                    <p className="text-xs text-white">
                        Newly added tasks
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-yellow-500 text-white shadow-sm shadow-slate-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-2">
                    <CardTitle className="text-sm font-medium">
                        In progress
                    </CardTitle>
                    <FileClock className="h-6 w-6"/>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="text-5xl leading-none font-bold mb-1">{taskCounts(TaskStatus.IN_PROGRESS)}</div>
                    <p className="text-xs text-white">
                        On going tasks
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-green-500 text-white shadow-sm shadow-slate-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Completed
                    </CardTitle>
                    <List className="h-6 w-6"/>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="text-5xl leading-none font-bold mb-1">{taskCounts(TaskStatus.DONE)}</div>
                    <p className="text-xs text-white">
                        Accomplished tasks
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-red-500 text-white shadow-sm shadow-slate-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Cancelled
                    </CardTitle>
                    <XCircle className="h-6 w-6"/>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="text-5xl leading-none font-bold mb-1">{taskCounts(TaskStatus.CANCELLED)}</div>
                    <p className="text-xs text-white">
                        Cancelled tasks
                    </p>
                </CardContent>
            </Card>
        </div>
    )
};

export default TaskStatusCards;