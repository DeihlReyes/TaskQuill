import { Project, Task, TaskStatus } from "@prisma/client";
import { format } from "date-fns";
import { FolderPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectWithTask } from "@/lib/types";

const Projects = async () => {
  const fetchProjects = async () => {
    const response = await fetch("/api/project");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  };

  const data = await fetchProjects();

  const firstTwoProjects = data ? data.slice(0, 2) : [];

  const taskPercentage = (projectId: string) => {
    const project = data.find((project: Project) => project.id === projectId);
    const totalTasks = project?.task.length;
    const completedTasks = project?.task.filter(
      (task: Task) => task.status === TaskStatus.DONE
    ).length;

    const percentage = Math.round((completedTasks! / totalTasks!) * 100);

    if (isNaN(percentage)) {
      return 0;
    }
    return percentage;
  };

  return (
    <>
      <Card className="w-full shadow-sm shadow-slate-400 lg:w-2/3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold tracking-wide">
            Recent Projects
          </CardTitle>
          <CardDescription className="text-xs">
            List of your recent projects
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full py-4">
          <div className="grid w-full grid-cols-1 items-center justify-center gap-4 py-4 lg:grid-cols-3">
            {firstTwoProjects.map((project: ProjectWithTask, index: number) => (
              <a
                key={index}
                href={`/projects/${project.id}`}
                className="h-full"
              >
                <Card className="h-full w-full border border-slate-300 shadow-sm dark:border-slate-600">
                  <CardHeader className="pt-4">
                    <CardTitle className="flex flex-row justify-between">
                      <div className="line-clamp-1 p-0 text-base">
                        {project.title}
                      </div>
                      <Badge className="text-sm">{project.projectTag}</Badge>
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div>
                      <Progress value={taskPercentage(project.id)} />
                      <div className="flex flex-row justify-end">
                        {taskPercentage(project.id)}%
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pb-4 text-sm">
                    Date Started:{" "}
                    <span className="font-bold">
                      {format(new Date(project.created), "MM-dd-yyyy")}
                    </span>
                  </CardFooter>
                </Card>
              </a>
            ))}
            <a href={"/projects"} className="h-full">
              <Card className="w-full border border-slate-300 shadow-sm dark:border-slate-600">
                <CardHeader className="flex flex-col items-center justify-center pt-4">
                  <CardTitle className="flex flex-row justify-between text-base font-bold">
                    Add Project
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Create more projects now!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row items-center justify-center">
                  <FolderPlus className="h-16 w-16 text-primary" />
                </CardContent>
              </Card>
            </a>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Projects;
