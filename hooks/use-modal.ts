import { TaskSchema, TaskSchemaWithId } from "@/lib/validation/task";
import { Project, Task, Meeting } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createProject"
  | "createTask"
  | "createMeeting"
  | "deleteTask"
  | "deleteProject"
  | "deleteMeeting"
  | "editTask"
  | "editProject"
  | "editMeeting";

interface ModalData {
  project?: Project;
  task?: TaskSchemaWithId;
  meeting?: Meeting;
  apiUrl?: string;
  taskId?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
