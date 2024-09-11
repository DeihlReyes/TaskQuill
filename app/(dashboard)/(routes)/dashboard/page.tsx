import DashboardItems from "@/components/dashboard/items";

const Dashboard = async () => {
  return (
    <section className="flex w-full flex-col gap-4 p-6 md:p-8">
      <DashboardItems />
    </section>
  );
};

export default Dashboard;
