import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./theme-toggle";
import NavbarGreeter from "./navbar-greet";

const Navbar = () => {
  return (
    <header className="px-4 pb-2 pt-6">
      <div className="flex flex-row items-center justify-between">
        <MobileSidebar />
        <NavbarGreeter />
        <div className="flex flex-row items-center justify-center gap-5">
          <ModeToggle />
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
