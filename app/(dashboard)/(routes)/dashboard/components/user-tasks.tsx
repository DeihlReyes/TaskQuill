import TaskTable from "@/components/task-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const UserTasks = async () => {
    return(
        <div>
            <Card className="shadow-sm shadow-slate-400">
                <CardHeader>
                    <CardTitle className="text-base tracking-wide font-bold">My Tasks</CardTitle>
                    <CardDescription className="text-xs">List of your Tasks</CardDescription>
                </CardHeader>
                <CardContent className="w-full pb-4">
                    <TaskTable />
                </CardContent>
            </Card>
        </div>
    );
};

export default UserTasks;