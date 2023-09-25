import { profile } from "@/lib/profile";
import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
    const currentProfile = await profile();
    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    return ( 
      <div className="flex justify-between items-center py-6 px-4">
        <MobileSidebar/>
        <div className="flex w-full justify-end md:justify-between">
          <div className="hidden md:block">
              <p className="font-bold text-md">Welcome back, {currentProfile.name}</p>
              <p>{formattedDate}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 my-auto">
            <div><ModeToggle /></div>
            <div><UserButton afterSignOutUrl="/" /></div>
          </div>
        </div>
      </div>
     );
}
 
export default Navbar;