import { Label, Priority, TaskStatus } from "@prisma/client"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: Label.BUG,
    label: Label.BUG,
  },
  {
    value: Label.FEATURE,
    label: Label.FEATURE,
  },
  {
    value: Label.DOCUMENTATION,
    label: Label.DOCUMENTATION,
  },
  {
    value: Label.IMPROVEMENT,
    label: Label.IMPROVEMENT,
  },
  { 
    value: Label.REFACTOR,
    label: Label.REFACTOR,
  },
  {
    value: Label.TEST,
    label: Label.TEST,
  }
]

export const statuses = [
  {
    value: "Todo",
    label: TaskStatus.TODO,
    icon: CircleIcon,
    color: "text-blue-500"
  },
  {
    value: "In Progress",
    label: TaskStatus.IN_PROGRESS,
    icon: StopwatchIcon,
    color: "text-yellow-500"
  },
  {
    value: "Completed",
    label: TaskStatus.DONE,
    icon: CheckCircledIcon,
    color: "text-green-500"
  },
  {
    value: "Cancelled",
    label: TaskStatus.CANCELLED,
    icon: CrossCircledIcon,
    color: "text-red-500"
  },
]

export const priorities = [
  {
    label: Priority.LOW,
    value: "Low",
    icon: ArrowDownIcon,
  },
  {
    label: Priority.MEDIUM,
    value: "Medium",
    icon: ArrowRightIcon,
  },
  {
    label: Priority.HIGH,
    value: "High",
    icon: ArrowUpIcon,
  },
]
