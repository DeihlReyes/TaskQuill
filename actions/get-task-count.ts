import { Task } from "@prisma/client";
import { ListChecks } from "lucide-react";

export const getTaskCount = ({ tasks }: { tasks: Task[] }) => {
    const taskCounts = (status: string) => {
        return tasks.filter((task) => task.status === status).length;
    };
    
    const tasksWithCount = [
        {
            label: "TODO",
            value: "Todo",
            count: taskCounts("TODO"),
            color: "bg-blue-500",
            icon: "ListChecks"
        },
        {
            label: "IN_PROGRESS",
            value: "In Progress",
            count: taskCounts("IN_PROGRESS"),
            color: "bg-yellow-500",
            icon: "ListChecks"
        },
        {
            label: "DONE",
            value: "Completed",
            count: taskCounts("DONE"),
            color: "bg-green-500",
            icon: "ListChecks"
        },
        {
            label: "CANCELLED",
            value: "Cancelled",
            count: taskCounts("CANCELLED"),
            color: "bg-red-500",
            icon: "ListChecks"
        },
    ]

    return tasksWithCount;
};