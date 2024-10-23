import { UserButton } from "@clerk/nextjs";

import { profile } from "@/lib/profile";

import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
  const currentUser = await profile();
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="px-6 pb-2 pt-6 md:px-8">
      <nav className="flex flex-row items-center justify-between">
        <MobileSidebar />
        <div className="hidden md:block">
          <h1 className="text-lg font-bold">
            Welcome Back, {currentUser.name}
          </h1>
          <p>{date}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <ModeToggle />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
