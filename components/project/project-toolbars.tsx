"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";

export const ProjectToolbars = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-xl font-bold md:text-3xl">My Projects</h1>
      <Button onClick={() => onOpen("createProject")}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Project
      </Button>
    </div>
  );
};
