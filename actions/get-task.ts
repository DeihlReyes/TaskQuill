import { prismaDB } from "@/lib/prismaDb";
import { Task } from "@/lib/validation/task";

export const getTasks = async (
    { projectId, taskId }: { projectId?: string, taskId?: string, userId?: string } = {}
) => {
    const whereClause: {
        projectId?: string;
        taskId?: string;
    } = {
        
    };

    if (projectId) {
        whereClause.projectId = projectId;
    }

    if(taskId) {
        whereClause.taskId = taskId;
    }

    const tasks = await prismaDB.task.findMany({
        where: whereClause,
        orderBy: {
            created: "asc",
        }
    });

    return tasks as Task[];
};
