import { CalendarRange } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Meeting } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";


export const MeetingSidebar = ({meetings}: {meetings: Meeting[]}) => {
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
        <div>
            {meetings.length === 0 ? (
              <div className="flex flex-col items-center">
                  <p className="text-sm text-foreground">No meetings yet, create now.</p>
              </div>
            ) : (
              meetings.map((metting: Meeting) => (
                  <div className="flex flex-row justify-between py-4 px-2 border-b-2" key={metting.title}>
                      <div>
                          <h1 className="text-base font-semibold leading-loose">{metting.title}</h1>
                          <p className="text-sm text-foreground">{format(new Date(metting.date), "MMMM dd, yyyy")}</p>
                      </div>
                      <a href={metting.link} target="_blank">
                          <Button>
                              <Plus className="h-5 w-5 pr-2"/>
                              Join
                          </Button>
                      </a>
                  </div>
              ))
            )}
          </div>
      </CardContent>
    </Card>
  );
};