import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { ProjectWithTask } from "@/types";
  import { format } from "date-fns";
  import { getProject } from "@/actions/get-project";
import { getMeetings } from "@/actions/get-meetings";
import { Meeting } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
  
  
export const MeetingTiles = async () => {
const meetings = await getMeetings();

return (
    <div>
      {meetings && meetings.length > 0 ? (
        <div className="grid gap-8 py-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {meetings.map((meeting: Meeting) => (
            <div key={meeting.id} className="cursor-pointer">
              <a href={`/tasks/${meeting.id}`} className="block h-full">
                <Card className="h-full hover:scale-105 active:scale-100 transition-all ease-in-out">
                  <CardHeader>
                    <CardTitle className="flex flex-row justify-between font-bold">
                      <div className="text-xl ">{meeting.title}</div> 
                    </CardTitle>
                    <CardDescription>Date Started: {format(new Date(meeting.created), "MM-dd-yyyy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-24">
                    <p className="text-slate-600 overflow-hidden text-ellipsis line-clamp-3">{meeting.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    
                  </CardFooter>
                </Card>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-center mt-8 text-gray-400">No projects yet, create now!</p>
        </div>
      )}
    </div>
  );
};
