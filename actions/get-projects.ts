import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { ProjectWithTask } from "@/types";

export const getProjects = async () => {
    const currentProfile = await profile();

    let projects: ProjectWithTask[];

    projects = await prismaDB.project.findMany({
        where: {
            userId: currentProfile.id
        },
        include: {
            task: true
        },
        orderBy: {
            created: "desc"
        }
    });

    return projects;
};