import { SelectProject } from "@/components/select-projects";
import { TaskToolbar } from "@/components/task-toolbars";
import TaskTable from "@/components/tasks/task-table";

const Tasks = () => {
    return (
        <div className="md:p-8 p-4 flex flex-col justify-center mx-auto">
            <div>
                <TaskToolbar />
                <SelectProject />
            </div>
            <div className="py-12">
                <TaskTable projectId={"project"} />
            </div>
        </div>
    );
}

export default Tasks;
  