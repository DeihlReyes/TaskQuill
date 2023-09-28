import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return ( 
    <div className="h-full relative overflow-clip transition-all ease-linear">
      <div className="hidden h-full w-screen md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
        <Sidebar/>
      </div>
      <main className="md:pl-60">
        <Navbar />
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;