import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Project, Task } from "@prisma/client";

export const getProject = async () => {
    const currentProfile = await profile();

    const projects = await prismaDB.project.findMany({
        include: {
            task: true,
        },
        orderBy: {
            created: "desc",
        },
    });

    return projects;
};