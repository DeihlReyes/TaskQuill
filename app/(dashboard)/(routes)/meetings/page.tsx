import { ProjectTiles } from "@/components/project-tiles";
import { MeetingToolbar } from "./components/meeting-toolbar";
import { MeetingTiles } from "./components/meeting-tiles";

const Meetings = () => {
  return (
    <div className="flex flex-col justify-center p-6 md:p-8">
      <MeetingToolbar />
      <MeetingTiles />
    </div>
  );
};

export default Meetings;
