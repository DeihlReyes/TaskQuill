import { ProjectTitle } from "@/components/project-title";
import TaskTable from "@/components/task-table";

const TaskPage = async (
    {params} : {params: {projectId: string}}
) => {
        return (
            <div className="md:p-8 p-4 flex flex-col justify-center mx-auto">
                <div>
                    <ProjectTitle projectId={params.projectId} />
                </div>
                <div className="py-12">
                    <TaskTable projectId={params.projectId} />
                </div>
            </div>
        );
}

export default TaskPage;
