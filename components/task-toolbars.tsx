'use client'

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useModal } from "@/hooks/use-modal";
  
export const TaskToolbar = () => {
    const { onOpen } = useModal();

    return(
        <div className="flex flex-row justify-between">
            <h1 className="mb-4 md:text-xl font-bold">My Projects</h1>
            <Button onClick={() => onOpen("createTask")}>
                <PlusIcon className="h-4 w-4 mr-2 md:mr-4" />
                Add Task
            </Button>
        </div>
    );
};