import { ProjectTiles } from "@/components/project/project-tiles";
import { ProjectToolbars } from "@/components/project/project-toolbars";

const Projects = () => {
  return (
    <div className="p-6 md:p-8">
      <ProjectToolbars />
      <ProjectTiles />
    </div>
  );
};

export default Projects;
