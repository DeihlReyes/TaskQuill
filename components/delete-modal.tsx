"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteModal } from "@/hooks/use-delete-modal";


export const DeleteModal = () => {
  const DeleteModal = useDeleteModal();

  return (
    <Dialog open={DeleteModal.isOpen} onOpenChange={DeleteModal.onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div>
            <p>Are you sure you want to delete this task?</p>
        </div>
        <DialogFooter>
            <Button variant={"outline"} onClick={DeleteModal.onClose}>Cancel</Button>
            <Button>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};