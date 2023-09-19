'use client'

import useTasks from "@/hooks/use-tasks";
import { DataTable } from "../table-components/data-table";
import { columns } from "../table-components/columns";

const TaskTable = ({ projectId }: { projectId: string }) => {
    const {data: tasks = [] } = useTasks();
    
    return(
        <>
            <DataTable data={tasks} columns={columns} />
        </>
    );
};

export default TaskTable;