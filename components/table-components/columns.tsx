"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  labels,
  priorities,
  statuses,
} from "@/components/table-components/data/data";
import { TaskSchema } from "@/lib/validation/task";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<TaskSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.label === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.label === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-full items-center">
          {status.icon && (
            <status.icon
              className={cn("mr-2 h-4 w-4 text-muted-foreground", status.color)}
            />
          )}
          <span>{status.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.label === row.getValue("priority"),
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("dueDate")!.toString();

      // Check if value is not null or undefined
      if (value) {
        const date = new Date(value);
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        return <div className="w-[70px]">{formattedDate}</div>;
      } else {
        return <div className="w-[70px]">N/A</div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
