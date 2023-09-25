import { Project } from "@prisma/client";
import { getProject } from "@/actions/get-projects";

export const ProjectTitle = async ({ projectId }: { projectId: string }) => {
    const projects = await getProject();
    const project = projects?.find((project: Project) => project.id === projectId);
    let projectTitle = project?.title;

    if (projectTitle === undefined || projectTitle === null) {
        projectTitle = "All Tasks";
    }
    
    return(
        <div className="flex items-center">
            <h1 className="text-xl md:text-3xl font-bold">
                {projectTitle}
            </h1>
        </div>
    )
};