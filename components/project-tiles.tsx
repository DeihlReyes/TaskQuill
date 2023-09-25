import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectWithTask } from "@/types";
import { format } from "date-fns";
import { getProject } from "@/actions/get-project";

export const ProjectTiles = async () => {
  const projects = await getProject();

  return (
    <div>
      <div className="grid gap-8 py-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {projects && projects.length > 0 ? (
          projects.map((project: ProjectWithTask) => (
            <div key={project.id} className="cursor-pointer">
              <a href={`/tasks/${project.id}`} className="block h-full">
                <Card className="h-full shadow-lg dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription>Date Started: {format(new Date(project.created), "MM-dd-yyyy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-24">
                    <p className="text-slate-600 overflow-hidden text-ellipsis line-clamp-3">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <h1 className="text-center font-bold text-lg">Number of Task: {project.task.length}</h1>
                  </CardFooter>
                </Card>
              </a>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center pt-52 h-full">
            <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
          </div>
        )}
      </div>
    </div>
  );
};
