'use client'

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { DataTable } from "@/components/table-components/data-table";
import { columns } from "@/components/table-components/columns";
import { useModal } from "@/hooks/use-modal";
import TaskTable from "@/components/tasks/task-table";
import useProject from "@/hooks/use-project";
import { Project } from "@prisma/client";

const Tasks = () => {
    const { onOpen } = useModal();

    const { data: Projects =  []  } = useProject();

    return (
        <div className="md:p-8 p-4 flex flex-col justify-center mx-auto">
            <div className="flex flex-col">
                <h1 className="mb-4 md:text-xl font-bold">My Projects</h1>
                <div className="flex flex-row justify-between">
                    <Select>
                        <SelectTrigger className="w-3/5 border-2 border-[#0d0d0d]/20 dark:border-[#fefefe]/20">
                            <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                            {Projects.map((project: Project) => (
                                <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={() => onOpen("createTask")}>
                        <PlusIcon className="h-4 w-4 mr-2 md:mr-4" />
                        Add Task
                    </Button>
                </div>
            </div>
            <div className="py-12">
                <TaskTable projectId={"project"} />
            </div>
        </div>
    );
}

export default Tasks;
  