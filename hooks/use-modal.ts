import { Project, Task } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createProject" | "createTask" | "deleteTask";

interface ModalData {
  project?: Project;
  tasks?: Task;
  apiUrl?: string;
  query?: Record<string, any>;
  projectId?: string; // Add projectId property here
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData, projectId?: string) => void; // Include projectId parameter here
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}, projectId?: string) => set({ isOpen: true, type, data: { ...data, projectId } }),
  onClose: () => set({ type: null, isOpen: false })
}));
