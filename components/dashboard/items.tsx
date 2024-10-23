"use client";

import { HydrationBoundary, useQuery } from "@tanstack/react-query";

import { MeetingSidebar } from "@/components/dashboard/meeting-sidebar";
import Projects from "@/components/dashboard/projects";
import TaskStatusCards from "@/components/dashboard/tasks-status-cards";
import UserTasks from "@/components/dashboard/user-tasks";

function DashboardItems() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/api/task");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });

  if (!data) return null;

  return (
    <>
      {/* <TaskStatusCards task={data} />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Projects />
        <MeetingSidebar />
      </div> */}
      <UserTasks tasks={data} />
    </>
  );
}

export default DashboardItems;
