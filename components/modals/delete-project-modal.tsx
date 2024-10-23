"use client";

import { useRouter } from "next/navigation";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoaderIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export const DeleteProjectModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["projects"];
  const projectId = data?.projectId;

  const isModalOpen = isOpen && type === "deleteProject";

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/project/${projectId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      router.push("/projects");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </p>
        </div>
        <AlertDialogFooter>
          <Button
            onClick={handleClose}
            variant="outline"
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={mutation.isPending}
            variant="destructive"
          >
            {mutation.isPending ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
