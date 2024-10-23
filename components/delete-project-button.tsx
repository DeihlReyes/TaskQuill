"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Trash2 } from "lucide-react";

interface DeleteProjectButtonProps {
  projectId: string;
}

export const DeleteProjectButton: React.FC<DeleteProjectButtonProps> = ({
  projectId,
}) => {
  const { onOpen } = useModal();

  return (
    <Button
      variant="destructive"
      className="py-4"
      onClick={() => onOpen("deleteProject", { projectId })}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
};
