import { MeetingSidebar } from "./components/meeting-sidebar";
import Projects from "./components/projects";
import TaskStatusCards from "./components/tasks-status-cards";
import UserTasks from "./components/user-tasks";

const Dashboard = async () => {
  return (
    <div className="flex flex-col w-full p-4 gap-4">
      <TaskStatusCards />
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <Projects />
        <MeetingSidebar/>
      </div>
      <UserTasks />
    </div>

  );
};

export default Dashboard;