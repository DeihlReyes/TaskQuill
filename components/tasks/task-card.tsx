'use client'

import useTasks from "@/hooks/use-tasks";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Task } from "@prisma/client";
import { cn } from "@/lib/utils";
import useCountTask from "@/hooks/use-countTask";

const TaskCard = () => {
    const taskCounts: Record<string, number> = useCountTask();

    const tasks = [
        {
            label: "TODO",
            value: "Todo",
            count: taskCounts.TODO,
            color: "text-blue-500"
        },
        {
            label: "IN_PROGRESS",
            value: "In Progress",
            count: taskCounts.IN_PROGRESS,
            color: "text-yellow-500"
        },
        {
            label: "DONE",
            value: "Completed",
            count: taskCounts.DONE,
            color: "text-green-500"
        },
        {
            label: "CANCELLED",
            value: "Cancelled",
            count: taskCounts.CANCELLED,
            color: "text-red-500"
        },
    ]

    return (
        <>
            {tasks.map((task) => (
                <Card
                    key={task.label}
                    className="w-40 md:w-52 text-center shadow-md dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 hover:scale-105"
                >
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{task.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className={cn("md:text-5xl font-bold", task.color)}>
                            {task.count}
                        </h1>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default TaskCard;
