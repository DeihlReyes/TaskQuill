import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { ProjectWithTask } from "@/types";
import { format } from "date-fns";
import { getProject } from "@/actions/get-project";
import { Button } from "react-day-picker";


export const ProjectTiles = async () => {
  const projects = await getProject();

  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid gap-8 py-12 md:grid-cols-3 xl:grid-cols-4">
          {projects.map((project: ProjectWithTask) => (
            <div key={project.id} className="cursor-pointer">
              <a href={`/projects/${project.id}`} className="block h-full">
                <Card className="h-full transition-all ease-in-out">
                  <CardHeader>
                    <CardTitle className="flex flex-row justify-between font-bold text-base md:text-xl">
                      <div className="line-clamp-1">{project.title}</div> 
                      <Badge>{project.projectTag}</Badge>
                    </CardTitle>
                    <CardDescription className="text-base md:text-xl">Date Started: {format(new Date(project.created), "MM-dd-yyyy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-24">
                    <p className="text-foreground text-sm md:text-lg overflow-hidden text-ellipsis line-clamp-3">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <h1 className="text-center font-bold text-sm md:text-lg">Number of Tasks: {project.task.length}</h1>
                  </CardFooter>
                </Card>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
        </div>
      )}
    </div>
  );
};
