"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProjectWithTask } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { ProjectCard } from "./project-card";

export const ProjectTiles = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<ProjectWithTask[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get("/api/project");
      return response.data;
    },
  });

  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="grid gap-8 py-12 md:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading projects</div>;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          {filteredProjects.map((project: ProjectWithTask) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-12">
          <p className="text-center text-gray-500">No projects found</p>
        </div>
      )}
    </div>
  );
};
