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

export const ProjectTiles = async () => {
  const projects = await getProject();

  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {projects.map((project: ProjectWithTask) => (
            <div key={project.id} className="cursor-pointer">
              <a href={`/projects/${project.id}`} className="block h-full">
                <Card className="h-full transition-all ease-in-out">
                  <CardHeader>
                    <CardTitle className="flex flex-row justify-between text-base font-bold md:text-xl">
                      <div className="line-clamp-1">{project.title}</div>
                      <Badge>{project.projectTag}</Badge>
                    </CardTitle>
                    <CardDescription className="text-base md:text-xl">
                      Date Started:{" "}
                      {format(new Date(project.created), "MM-dd-yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-24">
                    <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm text-foreground md:text-lg">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <h1 className="text-center text-sm font-bold md:text-lg">
                      Number of Tasks: {project.task.length}
                    </h1>
                  </CardFooter>
                </Card>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="mt-8 text-center text-gray-400">
            No projects yet, create now!
          </p>
        </div>
      )}
    </div>
  );
};
