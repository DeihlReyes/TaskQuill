import { Project, Task } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createProject"
  | "createTask"
  | "deleteTask"
  | "createMeeting";

interface ModalData {
  project?: Project;
  tasks?: Task;
  apiUrl?: string;
  query?: Record<string, any>;
  projectId?: string;
  taskId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void; // Include projectId parameter here
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
