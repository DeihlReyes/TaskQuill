'use client'

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useModal } from "@/hooks/use-modal";

export const TaskToolbar = (
    { projectId, children }: 
    { projectId: string, children: React.ReactNode }
) => {
    const { onOpen } = useModal();

    return(
        <div>
            <div className="flex flex-row justify-between">
                {children}
                <Button onClick={() => onOpen("createTask", {projectId})}>
                    <PlusIcon className="h-4 w-4 mr-2 md:mr-4" />
                    Add Task
                </Button>
            </div>
        </div>
    );
};
