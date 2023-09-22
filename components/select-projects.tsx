import { getProjects } from "@/actions/get-projects";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Project } from "@prisma/client";

export const SelectProject = async () => {
    const Projects = await getProjects();

    return(
        <Select>
            <SelectTrigger className="w-3/5 md:w-1/3 border-2 border-[#0d0d0d]/20 dark:border-[#fefefe]/20">
                <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
                {Projects.map((project: Project) => (
                    <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};