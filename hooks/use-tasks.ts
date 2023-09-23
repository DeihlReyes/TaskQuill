import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTasks = ({ projectId }: { projectId: string }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: async () => {
            const response = await axios.get(`/api/tasks/${projectId}`);
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
