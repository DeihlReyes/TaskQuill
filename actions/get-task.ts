import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Task } from "@prisma/client";

export const getTasks = async (
    { projectId, taskId }: { projectId?: string, taskId?: string } = {}
) => {
    const currentProfile = await profile();

    const whereClause: {
        userId: string;
        projectId?: string;
        taskId?: string;
    } = {
        userId: currentProfile.id,
    };

    if (projectId) {
        whereClause.projectId = projectId;
    }

    if(taskId) {
        whereClause.taskId = taskId;
    }

    const tasks: Task[] = await prismaDB.task.findMany({
        where: whereClause,
    });

    return tasks;
};
