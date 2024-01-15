import { ProjectTitle } from "@/components/project/project-title";
import TaskTable from "@/components/task-table";

const TaskPage = async ({ params }: { params: { projectId: string } }) => {
  return (
    <div className="mx-auto flex flex-col justify-center p-4 md:p-8">
      <div>
        <ProjectTitle projectId={params.projectId} />
      </div>
      <div className="py-12">
        <TaskTable projectId={params.projectId} />
      </div>
    </div>
  );
};

export default TaskPage;
