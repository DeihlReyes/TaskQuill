import { useQuery } from "@tanstack/react-query";

export async function GetTasks() {
    const { data: Tasks, isLoading  } = useQuery({
        queryKey: ['projects'],
        queryFn: () => fetch("/api/tasks").then((res) => res.json()),
    });

    return Tasks;
}
