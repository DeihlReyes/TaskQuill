import { useQuery } from "@tanstack/react-query";
import { CalendarRange } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MeetingCards from "./meeting-cards";

export const MeetingSidebar = async () => {
  const fetchMeetings = async () => {
    const response = await fetch("/api/meeting");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  };

  const data = await fetchMeetings();

  return (
    <>
      <Card className="w-full shadow-sm shadow-slate-400 lg:w-1/3">
        <CardHeader className="flex flex-row items-center gap-4 px-5 pt-8">
          <CalendarRange className="h-7 pt-1 text-primary" />
          <div>
            <CardTitle className="text-base leading-tight tracking-wide">
              Upcoming Meetings
            </CardTitle>
            <CardDescription className="text-xs">
              List of your upcoming meetings.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-5 pb-8">
          <MeetingCards meetings={data} />
        </CardContent>
      </Card>
    </>
  );
};
