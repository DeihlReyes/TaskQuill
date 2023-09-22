import { ProjectTiles } from "@/components/project-tiles";
import { ProjectToolbars } from "@/components/project-toolbars";


const Projects = () => {
    return (
        <div className="md:p-8 p-4 flex flex-col justify-center">
            <div>
              <ProjectToolbars />
            </div>
            <div>
              <ProjectTiles />
            </div>
        </div>
    ); 
}

export default Projects;
  