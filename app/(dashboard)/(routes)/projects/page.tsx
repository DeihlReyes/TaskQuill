import { ProjectTiles } from "@/components/project-tiles";
import { ProjectToolbars } from "@/components/project-toolbars";


const Projects = () => {
    return (
        <div className="md:p-8 p-4 flex flex-col justify-center">
            <ProjectToolbars />
            <ProjectTiles />
        </div>
    ); 
}

export default Projects;
  