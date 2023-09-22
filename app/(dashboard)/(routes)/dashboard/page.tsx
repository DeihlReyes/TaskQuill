import { MeetingSidebar } from "@/components/meeting-sidebar"
import TaskCard from "@/components/tasks/task-card";
import TaskTable from "@/components/tasks/task-table";


const Dashboard = () => {
  return (
    <div>
      <main className="flex flex-col md:flex-row md:justify-center md:gap-8 p-4">
        <div className="w-full md:w-3/4">
          <div className="flex flex-wrap md:flex-row gap-4 justify-evenly md:justify-between items-center">
            <TaskCard />
          </div>
          <div className="py-12">
            <TaskTable projectId="gad" />
          </div>
        </div>
        <div className="hidden md:block w-1/4 h-full">
          <MeetingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;