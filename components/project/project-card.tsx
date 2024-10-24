import Link from "next/link";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectWithTask } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectWithTask;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <Card className="h-full transition-all ease-in-out hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between text-base font-bold md:text-xl">
            <div className="line-clamp-1">{project.title}</div>
            <Badge>{project.projectTag}</Badge>
          </CardTitle>
          <CardDescription className="text-base md:text-xl">
            Date Started: {format(new Date(project.created), "MM-dd-yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-24">
          <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm text-foreground md:text-lg">
            {project.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <h2 className="text-center text-sm font-bold md:text-lg">
            Number of Tasks: {project.task.length}
          </h2>
        </CardFooter>
      </Card>
    </Link>
  );
};
