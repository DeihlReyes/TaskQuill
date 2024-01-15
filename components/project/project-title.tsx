import { Project } from "@prisma/client";
import { getProject } from "@/actions/get-project";
import { ButtonModal } from "../button-modal";

export const ProjectTitle = async ({ projectId }: { projectId: string }) => {
  const projects = await getProject();
  const project = projects?.find(
    (project: Project) => project.id === projectId,
  );
  let projectTitle = project?.title;

  if (projectTitle === undefined || projectTitle === null) {
    projectTitle = "All Tasks";
  }

  return (
    <div className="flex w-full flex-col items-start gap-4 md:gap-6">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold md:text-3xl">{projectTitle}</h1>
        <ButtonModal projectId={projectId} />
      </div>
      <p className="text-md w-full text-foreground md:w-2/3 md:text-lg">
        {project?.description}
      </p>
    </div>
  );
};
