import { ProjectTiles } from "@/components/project-tiles";
import { ProjectToolbars } from "@/components/project-toolbars";

const Projects = () => {
  return (
    <div className="flex flex-col justify-center p-6 md:p-8">
      <ProjectToolbars />
      <ProjectTiles />
    </div>
  );
};

export default Projects;
