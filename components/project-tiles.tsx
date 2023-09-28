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
import { Badge } from "./ui/badge";

export const ProjectTiles = async () => {
  const projects = await getProject();

  return (
    <div className="grid gap-8 py-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {projects && projects.length > 0 ? (
        projects.map((project: ProjectWithTask) => (
          <div key={project.id} className="cursor-pointer">
            <a href={`/tasks/${project.id}`} className="block h-full">
              <Card className="h-full shadow-lg dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 hover:scale-105 active:scale-100 transition-all ease-in-out">
                <CardHeader>
                  <CardTitle className="flex flex-row justify-between font-bold">
                    <div className="text-xl ">{project.title}</div> 
                    <Badge className="text-lg">{project.projectTag}</Badge>
                  </CardTitle>
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
        <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
      )}
    </div>
  );
};
