import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./theme-toggle";
import NavbarGreeter from "./navbar-greet";

const Navbar =  () => {
    return(
      <header className="px-4 pt-6 pb-2">
        <div className="flex flex-row justify-between items-center">
          <MobileSidebar />
          <NavbarGreeter />
          <div className="flex flex-row gap-5 justify-center items-center">
            <ModeToggle />
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10"
              },
            }} />
          </div>
        </div>
      </header>
    );
}
 
export default Navbar;