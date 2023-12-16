'use client'


import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export const MeetingToolbar = () => {
    const { onOpen } = useModal();

    return(
        <div className="flex flex-row justify-between">
            <h1 className="text-xl md:text-3xl font-bold">My Meetings</h1>
            <Button onClick={() => onOpen("createMeeting")}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Meeting
            </Button>
        </div>
    );
};