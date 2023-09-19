'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProject = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await axios.get("/api/projects");
            const data = response.data;
            return data.Projects;
        },
    }) 

    return {
        data,
        error,
        isLoading,
    }
};

export default useProject;