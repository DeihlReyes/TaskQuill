'use client'

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useModal } from "@/hooks/use-modal";

export const ButtonModal = (
    { projectId,  }: 
    { projectId: string }
) => {
    const { onOpen } = useModal();

    return(
        <Button onClick={() => onOpen("createTask", {projectId})}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Task
        </Button>
    );
};
