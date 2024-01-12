import { CalendarRange } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import MeetingCards from "./meeting-cards";


export const MeetingSidebar = () => {

  return (
    <Card className="shadow-sm shadow-slate-400 w-full lg:w-1/3">
      <CardHeader className="px-5 pt-8 flex flex-row gap-4 items-center">
        <CalendarRange className="text-primary pt-1 h-7"/>
        <div>
          <CardTitle className="text-base tracking-wide leading-tight">Upcoming Meetings</CardTitle>
          <CardDescription className="text-xs">List of your upcoming meetings.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-5 pb-8">
        <MeetingCards/>
      </CardContent>
    </Card>
  );
};