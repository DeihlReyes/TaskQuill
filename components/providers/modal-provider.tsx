"use client";

import { useEffect, useState } from "react";

import { AddProjectModal } from "@/components/modals/add-project-modal";
import { AddTaskModal } from "@/components/modals/add-task-modal";
import { DeleteModal } from "@/components/modals/delete-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteModal />
      <AddProjectModal />
      <AddTaskModal />
    </>
  );
};