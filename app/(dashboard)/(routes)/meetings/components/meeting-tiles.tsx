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
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {meetings.map((meeting: Meeting) => (
            <div key={meeting.id} className="cursor-pointer">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex flex-row justify-between text-base font-bold md:text-xl">
                    <div>{meeting.title}</div>
                  </CardTitle>
                  <CardDescription>
                    Date Started:{" "}
                    {format(new Date(meeting.created), "MM-dd-yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-24 pb-0">
                  <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm text-foreground md:text-lg">
                    {meeting.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-end justify-end text-sm md:text-lg">
                  <Link href={meeting.link} target="blank">
                    <Button>
                      <EnterIcon className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="mt-8 text-center text-gray-400">
            No scheduled meeting yet.
          </p>
        </div>
      )}
    </div>
  );
};
