import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Task } from "@prisma/client";

export const getTasks = async () => {
    const currentProfile = await profile();
    
    let tasks: Task[];

    tasks = await prismaDB.task.findMany({
        where: {
            userId: currentProfile.id,
        },
        orderBy: {
            created: "desc",
        },
    });

    return tasks;
};