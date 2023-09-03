'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useModal } from "@/hooks/use-modal";
import { Project, Task} from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons"
import { useQuery } from '@tanstack/react-query'


type ProjectPageProps = Project & {
    task: Task[];
}

export const Projects = () => {
    const { onOpen } = useModal();

    const { data: projectsResponse  } = useQuery({
        queryKey: ['projects'],
        queryFn: () => fetch("/api/projects").then((res) => res.json()),
    });

    const projects = projectsResponse?.projects; 

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
                        <Card key={null} className="w-[350px] h-[300px] shadow-lg dark:shadow-[#fefefe]/20 shadow-[#0d0d0d]/20 cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">{project.description}</p>
                                <h1 className="text-center font-bold text-lg mt-8">Number of Task: {project.task.length}</h1>
                            </CardContent>    
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[500px]">
                    <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
                </div>
            )}
        </div>
    ); 
}

export default Projects;
  