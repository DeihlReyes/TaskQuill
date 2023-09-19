'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTasks = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await axios.get("/api/tasks");
            const data = response.data;
            return data.Task;
        },
    }) 

    return {
        data,
        error,
        isLoading,
    }
};

export default useTasks;