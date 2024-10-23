"use client";

import { PlusIcon } from "@radix-ui/react-icons";

import { useModal } from "@/hooks/use-modal";

import { Button } from "./ui/button";

export const ButtonModal = ({ projectId }: { projectId: string }) => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("createTask", { projectId })}>
      <PlusIcon className="mr-2 h-4 w-4" />
      Task
    </Button>
  );
};
