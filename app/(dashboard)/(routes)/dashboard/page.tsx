import { profile } from "@/lib/profile";
import { MeetingSidebar } from "@/components/dashboard/meeting-sidebar";
import Projects from "@/components/dashboard/projects";
import TaskStatusCards from "@/components/dashboard/tasks-status-cards";
import UserTasks from "@/components/dashboard/user-tasks";
import { getTasks } from "@/actions/get-task";
import { getProject } from "@/actions/get-project";
import { getMeetings } from "@/actions/get-meetings";

const Dashboard = async () => {
  const currentProfile = await profile();
  const tasksPromise = getTasks({ userId: currentProfile.id });
  const projectsPromise = getProject();
  const meetingsPromise = getMeetings();

  const [tasks, projects, meetings] = await Promise.all([
    tasksPromise,
    projectsPromise,
    meetingsPromise,
  ]);

  return (
    <section className="flex w-full flex-col gap-4 p-6 md:p-8">
      <TaskStatusCards task={tasks} />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Projects projects={projects} />
        <MeetingSidebar meetings={meetings} />
      </div>
      <UserTasks tasks={tasks} />
    </section>
  );
};

export default Dashboard;
