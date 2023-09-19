'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useModal } from "@/hooks/use-modal";
import useProject from "@/hooks/use-project";
import { Project, Task} from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons"
import { useQuery } from '@tanstack/react-query'
import { format } from "date-fns";


type ProjectPageProps = Project & {
    task: Task[];
}

const Projects = () => {
    const { onOpen } = useModal();

    const { data: projects, isLoading }  = useProject();

    return (
        <div className="md:p-8 p-4 flex flex-col justify-center">
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-lg md:text-2xl">My Projects</h1>
                <Button onClick={() => onOpen("createProject")}>
                    <PlusIcon className="h-4 w-4" />
                    Add Project
                </Button>
            </div>
            {projects && projects.length > 0 ? (
                <div className="flex flex-wrap gap-10 items-center justify-start py-12">
                    {projects.map((project: ProjectPageProps) => (
                        <Card key={project.id} className="w-[360px] h-[350px] shadow-lg dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                                <CardDescription>Date Started: {format(new Date(project.created), "MM-dd-yyyy")}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[180px]">
                                <p className="text-slate-600">{project.description}</p>
                            </CardContent>    
                            <CardFooter className="flex flex-col justify-center">
                                <h1 className="text-center font-bold text-lg">Number of Task: {project.task.length}</h1>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center pt-52 h-full">
                    <p className="text-center mt-8 text-gray-400">{isLoading ? "Loading..." : "No projects yet, create now!"}</p>
                </div>
            )}
        </div>
    ); 
}

export default Projects;
  