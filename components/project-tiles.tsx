import { getProjects } from "@/actions/get-projects";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ProjectWithTask } from "@/types";
import { format } from "date-fns";


export const ProjectTiles = async () => {
    const projects = await getProjects();

    return (
        <div>
            {projects && projects.length > 0 ? (
              <div className="grid gap-8 py-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {projects.map((project: ProjectWithTask) => (
                  <Card key={project.id} className="shadow-lg dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                      <CardDescription>Date Started: {format(new Date(project.created), "MM-dd-yyyy")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 overflow-hidden text-ellipsis line-clamp-3">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <h1 className="text-center font-bold text-lg">Number of Task: {project.task.length}</h1>
                    </CardFooter>
                  </Card>
                ))}
              </div>                           
            ) : (
                <div className="flex justify-center items-center pt-52 h-full">
                    <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
                </div>
            )}
        </div>
    );
};