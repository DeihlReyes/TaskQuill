import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Task, User } from "@prisma/client";

export const getTasks = async (
    { projectId, taskId, userId }: { projectId?: string, taskId?: string, userId?: string } = {}
) => {
    const currentProfile = await profile();

    const whereClause: {
        assigneeId?: string;
        projectId?: string;
        taskId?: string;
    } = {
        assigneeId: currentProfile.id,
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
