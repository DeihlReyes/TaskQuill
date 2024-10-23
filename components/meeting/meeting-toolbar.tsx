"use client";

import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export const MeetingToolbar = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-xl font-bold md:text-3xl">My Meetings</h1>
      <Button onClick={() => onOpen("createMeeting")}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Meeting
      </Button>
    </div>
  );
};
