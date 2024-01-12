import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full overflow-clip transition-all ease-linear">
      <div className="hidden h-full w-screen md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      <div className="md:pl-64">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
