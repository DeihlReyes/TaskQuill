;import { DataTable } from "../table-components/data-table";
import { columns } from "../table-components/columns";
import { getTasks } from "@/actions/get-tasks";

const TaskTable = async ({ projectId }: { projectId: string }) => {
    const tasks = await getTasks();
    
    return(
        <>
            <DataTable data={tasks} columns={columns} />
        </>
    );
};

export default TaskTable;