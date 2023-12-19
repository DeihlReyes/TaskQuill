import { getTasks } from "@/actions/get-task";
import { MeetingSidebar } from "./components/meeting-sidebar";
import Projects from "./components/projects";
import TaskStatusCards from "./components/tasks-status-cards";
import UserTasks from "./components/user-tasks";
import { profile } from "@/lib/profile";
import { getProject } from "@/actions/get-project";
import { getMeetings } from "@/actions/get-meetings";

const Dashboard = async () => {
  const currentProfile = await profile();
  const tasksPromise = getTasks({ userId: currentProfile.id });
  const projectsPromise = getProject();
  const meetingsPromise = getMeetings();
  
  const [tasks, projects, meetings] = await Promise.all([tasksPromise, projectsPromise, meetingsPromise]);

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      <TaskStatusCards task={tasks} />
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <Projects projects={projects} />
        <MeetingSidebar meetings={meetings}/>
      </div>
      <UserTasks tasks={tasks} />
    </div>
  );
};

export default Dashboard;