import { Task } from "@prisma/client";

export const getTaskCount = ({ tasks }: { tasks: Task[] }) => {
    const taskCounts = (status: string) => {
        return tasks.filter((task) => task.status === status).length;
    };
    
    const tasksWithCount = [
        {
            label: "TODO",
            value: "Todo",
            count: taskCounts("TODO"),
            color: "text-blue-500"
        },
        {
            label: "IN_PROGRESS",
            value: "In Progress",
            count: taskCounts("IN_PROGRESS"),
            color: "text-yellow-500"
        },
        {
            label: "DONE",
            value: "Completed",
            count: taskCounts("DONE"),
            color: "text-green-500"
        },
        {
            label: "CANCELLED",
            value: "Cancelled",
            count: taskCounts("CANCELLED"),
            color: "text-red-500"
        },
    ]

    return tasksWithCount;
};