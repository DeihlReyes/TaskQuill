import { Project } from "@prisma/client";
import { getProject } from "@/actions/get-project";
import { ButtonModal } from "./button-modal";

export const ProjectTitle = async ({ projectId }: { projectId: string }) => {
    const projects = await getProject();
    const project = projects?.find((project: Project) => project.id === projectId);
    let projectTitle = project?.title;

    if (projectTitle === undefined || projectTitle === null) {
        projectTitle = "All Tasks";
    }
    
    return(
        <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
            <div className="flex flex-row justify-between items-center gap-4 w-full">
                <h1 className="text-xl md:text-3xl font-bold">
                    {projectTitle}
                </h1>
                <ButtonModal projectId={projectId}/>
            </div>
            <p className="text-md md:text-lg w-full md:w-2/3 text-foreground">{project?.description}</p>
        </div>

    )
};