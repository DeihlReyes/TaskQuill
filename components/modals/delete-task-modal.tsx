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

export const DeleteTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["tasks"];
  const taskId = data?.taskId;

  const isModalOpen = isOpen && type === "deleteTask";

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/task/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      router.refresh();
      onClose();
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      // You can add error handling here, such as showing a toast notification
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
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>Are you sure you want to delete this task?</p>
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
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                Deleting...
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
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
