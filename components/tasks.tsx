'use client'

import { useSearchParams } from "next/navigation";
import { TaskToolbar } from "./task-toolbars";
import { ProjectTitle } from "./project-title";
import React from "react";
import TaskTable from "./tasks/task-table";

export const TaskSection = () => {
    const router = useSearchParams();
    const projectId = router.get('projectId') || "";
    console.log("ProjectID from page: ", projectId)

    return (
        <div className="md:p-8 p-4 flex flex-col justify-center mx-auto">
            <div>
                {/* client component */}
                <TaskToolbar projectId={projectId}>
                    <h1 className="mb-4 md:text-3xl font-bold">
                        {/* client component */}
                        <ProjectTitle projectId={projectId} />
                    </h1>
                </TaskToolbar>
            </div>
            <div className="py-12">
                {/* client component */}
                <TaskTable projectId={projectId} />
            </div>
        </div>
    );
};