import { getTasks } from "@/actions/get-task";
import { ProjectTitle } from "@/components/project/project-title";
import { columns } from "@/components/table-components/columns";
import { DataTable } from "@/components/table-components/data-table";
import { Task } from "@/lib/validation/task";

const TaskPage = async ({ params }: { params: { projectId: string } }) => {
  const tasks = await getTasks({ projectId: params.projectId }) as Task[];
  return (
    <div className="mx-auto flex flex-col justify-center p-6 md:p-8">
      <div>
        <ProjectTitle projectId={params.projectId} />
      </div>
      <div className="py-12">
        <DataTable data={tasks} columns={columns} />;
      </div>
    </div>
  );
};

export default TaskPage;
