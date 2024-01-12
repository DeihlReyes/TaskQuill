"use client";

import { useEffect, useState } from "react";

import { AddProjectModal } from "@/components/modals/add-project-modal";
import { AddTaskModal } from "@/components/modals/add-task-modal";
import { DeleteTaskModal } from "@/components/modals/delete-task-modal";
import { AddMeetingModal } from "../modals/add-meeting";

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
      <DeleteTaskModal />
      <AddProjectModal />
      <AddTaskModal />
      <AddMeetingModal />
    </>
  );
};
