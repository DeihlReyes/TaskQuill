'use client'


import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal";

export const ProjectToolbars = () => {
    const { onOpen } = useModal();

    return(
        <div className="flex flex-row justify-between">
            <h1 className="font-bold text-lg md:text-2xl">My Projects</h1>
            <Button onClick={() => onOpen("createProject")}>
                <PlusIcon className="h-4 w-4" />
                Add Project
            </Button>
        </div>
    );
};