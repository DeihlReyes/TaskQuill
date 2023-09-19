import { profile } from "@/lib/profile";
import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
    const userProfile = await profile();
    const currentDate = new Date();

    // Format the date using toLocaleDateString()
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
              <p className="font-bold text-md">Welcome back, {userProfile.name}</p>
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