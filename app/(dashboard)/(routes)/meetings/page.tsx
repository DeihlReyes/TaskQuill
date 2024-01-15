import { MeetingToolbar } from "@/components/meeting/meeting-toolbar";
import { MeetingTiles } from "@/components/meeting/meeting-tiles";

const Meetings = () => {
  return (
    <div className="flex flex-col justify-center p-6 md:p-8">
      <MeetingToolbar />
      <MeetingTiles />
    </div>
  );
};

export default Meetings;
