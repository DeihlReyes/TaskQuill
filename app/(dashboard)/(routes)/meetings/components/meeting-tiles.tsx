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
import { EnterIcon } from "@radix-ui/react-icons";
import Link from "next/link";
  
  
export const MeetingTiles = async () => {
const meetings = await getMeetings();

return (
    <div>
      {meetings && meetings.length > 0 ? (
        <div className="grid gap-8 py-12 md:grid-cols-3 xl:grid-cols-4">
          {meetings.map((meeting: Meeting) => (
            <div key={meeting.id} className="cursor-pointer">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex flex-row justify-between font-bold text-base md:text-xl">
                      <div>{meeting.title}</div> 
                    </CardTitle>
                    <CardDescription>Date Started: {format(new Date(meeting.created), "MM-dd-yyyy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-24 pb-0">
                    <p className="text-foreground text-sm md:text-lg overflow-hidden text-ellipsis line-clamp-3">{meeting.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end items-end text-sm md:text-lg">
                    <Link href={meeting.link} target="blank">
                      <Button>
                        <EnterIcon className="h-4 w-4 mr-2"/>
                        Join
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-center mt-8 text-gray-400">No scheduled meeting yet.</p>
        </div>
      )}
    </div>
  );
};
