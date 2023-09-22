import { getTasks } from "@/actions/get-tasks";
import useTasks from "./use-tasks";
import { Task, TaskStatus } from "@prisma/client"; // Import the TaskStatus enum

const useCountTask = async () => {
    const tasks = await getTasks(); // Get the tasks from the database

    // Initialize an object to store the count of tasks per status
    const taskCountsByStatus = {
        [TaskStatus.TODO]: 0,
        [TaskStatus.IN_PROGRESS]: 0,
        [TaskStatus.DONE]: 0,
        [TaskStatus.CANCELLED]: 0,
    };

    // Loop through the tasks and count them per status
    tasks.forEach((task: Task) => {
        const { status } = task;

        // Increment the count based on the task's status
        taskCountsByStatus[status]++;
    });

    return taskCountsByStatus;
};

export default useCountTask;
