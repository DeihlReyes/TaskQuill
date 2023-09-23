import useProject from "@/hooks/use-project";
import { Project } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton"

export const ProjectTitle = ({ projectId }: { projectId: string }) => {
    const { data: projects, isLoading } = useProject();
    const project = projects?.find((project: Project) => project.id === projectId);
    let projectTitle = project?.title;

    if (projectTitle === undefined || projectTitle === null) {
        projectTitle = "All Tasks";
    }
    
    return(
        //make a skeleton loader for this that looks like its loading
        isLoading ? <Skeleton className="h-8 w-[100px]" /> :
        <h1 className="md:text-3xl font-bold">
            {projectTitle}
        </h1>
    )
};