import { getMeetings } from "@/actions/get-meetings";
import { Button } from "@/components/ui/button";
import { Meeting } from "@prisma/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

const MeetingCards = async () => {
    const meetings = await getMeetings()
    return(
        <div>
            {meetings.length === 0 ? (
                <div className="flex flex-col items-center">
                    <p className="text-sm text-foreground">No meetings yet, create now.</p>
                </div>
            ) : (
                meetings.map((meeting: Meeting) => (
                    <div className="flex flex-row justify-between py-4 px-2 border-b-2" key={meeting.title}>
                        <div>
                            <h1 className="text-base font-semibold leading-loose">{meeting.title}</h1>
                            <p className="text-sm text-foreground">{format(new Date(meeting.date), "MMMM dd, yyyy")}</p>
                        </div>
                        <a href={meeting.link} target="_blank">
                            <Button>
                                <Plus className="h-5 w-5 pr-2"/>
                                Join
                            </Button>
                        </a>
                    </div>
                ))
            )}
        </div>
    );
} 

export default MeetingCards