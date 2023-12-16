import { getProject } from "@/actions/get-project";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectWithTask } from "@/types";
import { format } from "date-fns";
import { FolderPlus, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TaskStatus, User } from "@prisma/client";
import UserAvatar from "./user-avatars";


const Projects = async () => {
    const projects = await getProject();
    const firstTwoProjects = projects.slice(0, 2);

    const taskPercentage = (projectId: string) => {
        const project = projects.find((project) => project.id === projectId);
        const totalTasks = project?.task.length;
        const completedTasks = project?.task.filter((task) => task.status === TaskStatus.DONE).length;
        // get percentage and round it off to whole number
        const percentage = Math.round((completedTasks! / totalTasks!) * 100);
        
        if (isNaN(percentage)) {
            return 0;
        }
        return percentage;
    }

    return (
        <Card className="shadow-sm shadow-slate-400 w-full lg:w-2/3">
            <CardHeader className="pb-2">
                <CardTitle className="text-base tracking-wide font-bold">Recent Projects</CardTitle>
                <CardDescription className="text-xs">List of your recent projects</CardDescription>
            </CardHeader>
            <CardContent className="h-full pb-4">
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 py-4 w-full justify-center items-center">
                    {firstTwoProjects.map((project: ProjectWithTask) => (
                        <a key={project.id} href={`/tasks/${project.id}`} className="h-full">
                            <Card className="w-full h-full shadow-sm border border-slate-300 dark:border-slate-600">
                                <CardHeader className='pt-4'>
                                    <CardTitle className="flex flex-row justify-between">
                                        <div className="text-base p-0">{project.title}</div> 
                                        <Badge className="text-sm">{project.projectTag}</Badge>
                                    </CardTitle>
                                    <CardDescription></CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Progress value={taskPercentage(project.id)} />
                                        <div className="flex flex-row justify-end">{taskPercentage(project.id)}%</div>
                                    </div>
                                </CardContent>
                                <CardFooter className="text-sm pb-4">
                                    Date Started: <span className="font-bold">{format(new Date(project.created), "MM-dd-yyyy")}</span>
                                </CardFooter>
                            </Card>
                        </a>
                    ))}
                    <a href={'/projects'} className="h-full">
                        <Card className="w-full shadow-sm border border-slate-300 dark:border-slate-600">
                            <CardHeader className="flex flex-col justify-center items-center pt-4">
                                <CardTitle className="flex flex-row justify-between text-base font-bold">
                                    Add Project
                                </CardTitle>
                                <CardDescription className="text-sm">Create more projects now!</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-center items-center">
                                <FolderPlus className="h-16 w-16 text-primary" /> 
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default Projects;
