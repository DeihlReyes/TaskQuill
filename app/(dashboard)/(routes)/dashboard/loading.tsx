import LoadingProjects from "@/components/dashboard/loading/projects";
import LoadingTaskStatus from "@/components/dashboard/loading/task-status-cards";

const loading = () => {
  return (
    <section className="flex w-full flex-col gap-4 p-6 md:p-8">
      <LoadingTaskStatus />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <LoadingProjects />
      </div>
    </section>
  );
};

export default loading;
