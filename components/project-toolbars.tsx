'use client'


import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal";

export const ProjectToolbars = () => {
    const { onOpen } = useModal();

    return(
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold">My Projects</h1>
            <Button onClick={() => onOpen("createProject")}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Project
            </Button>
        </div>
    );
};