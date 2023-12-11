import { ProjectTiles } from "@/components/project-tiles";
import { MeetingToolbar } from "./components/meeting-toolbar";
import { MeetingTiles } from "./components/meeting-tiles";


const Projects = () => {
    return (
        <div className="md:p-8 p-6 flex flex-col justify-center">
            <MeetingToolbar />
            <MeetingTiles />
        </div>
    ); 
}

export default Projects;
  