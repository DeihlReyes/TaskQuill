"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { labels, statuses } from "@/components/table-components/data/data";
import { Task, taskSchemaTable } from "@/lib/validation/task";
import { useModal } from "@/hooks/use-modal";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchemaTable.parse(row.original);
  const { onOpen } = useModal();
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["tasks"];

  const { mutateAsync } = useMutation({
    mutationFn: async (task: Task) => {
      const response = await axios.put(`/api/task/${task.id}`, task);
      return response.data;
    },
    onMutate: async (newTask: Task) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTasks = queryClient.getQueryData<Task[]>(queryKey) || [];
      queryClient.setQueryData<Task[]>(queryKey, (oldTasks) => {
        return oldTasks?.map((task) =>
          task.id === newTask.id ? { ...task, ...newTask } : task,
        );
      });
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(queryKey, context?.previousTasks);
    },
  });

  const handleLabelChange = async (newLabel: string) => {
    const validLabels = [
      "BUG",
      "FEATURE",
      "IMPROVEMENT",
      "REFACTOR",
      "TEST",
      "DOCUMENTATION",
    ] as const;
    if (!validLabels.includes(newLabel as any)) {
      throw new Error("Invalid label");
    }
    const updatedTask: Task = { ...task, label: newLabel as Task["label"] };
    await mutateAsync(updatedTask);
  };

  const handleStatusChange = async (newStatus: string) => {
    const validStatuses = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"] as const;
    if (!validStatuses.includes(newStatus as any)) {
      throw new Error("Invalid status");
    }
    const updatedTask: Task = { ...task, status: newStatus as Task["status"] };
    await mutateAsync(updatedTask);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => onOpen("editTask", { task })}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.label}
              onValueChange={handleLabelChange}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.status}
              onValueChange={handleStatusChange}
            >
              {statuses.map((status) => (
                <DropdownMenuRadioItem key={status.label} value={status.label}>
                  {status.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => onOpen("deleteTask", { taskId: task.id })}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
