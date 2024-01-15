"use client";

import { useModal } from "@/hooks/use-modal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const taskId = data?.taskId;

  const isModalOpen = isOpen && type === "deleteTask";

  const deleteTask = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.delete(`/api/task/${taskId}`);
      if (response.status === 200) {
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsSubmitting(false);
    };
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>Are you sure you want to delete this task?</p>
        </div>
        <AlertDialogFooter>
          <Button onClick={handleClose} variant={"outline"} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={deleteTask} disabled={isSubmitting}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
