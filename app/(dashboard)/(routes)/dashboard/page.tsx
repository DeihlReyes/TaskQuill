import { MeetingSidebar } from "./components/meeting-sidebar";
import Projects from "./components/projects";
import TaskStatusCards from "./components/tasks-status-cards";
import UserTasks from "./components/user-tasks";

const Dashboard = async () => {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <TaskStatusCards />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Projects />
        <MeetingSidebar />
      </div>
      <UserTasks />
    </div>
  );
};

export default Dashboard;
