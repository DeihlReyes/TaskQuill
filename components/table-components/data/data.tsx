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
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
    color: "text-blue-500"
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
    color: "text-yellow-500"
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircledIcon,
    color: "text-green-500"
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
    color: "text-red-500"
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
