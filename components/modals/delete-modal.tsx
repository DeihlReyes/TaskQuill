"use client";

import { useModal } from "@/hooks/use-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import { Button } from "../ui/button";


export const DeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const taskId = data?.taskId

  const isModalOpen = isOpen && type === "deleteTask";

  const deleteTask = async () => {
    try {
      const response = await axios.delete(`/api/task/${taskId}`);
      if (response.status === 200) {
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
            <Button onClick={handleClose} variant={'outline'}>Cancel</Button>
            <Button onClick={deleteTask}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};