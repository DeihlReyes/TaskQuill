import { Button } from "@/components/ui/button";
import { Shapes } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between px-8 py-4 md:px-16 md:py-6">
        <Link href="/dashboard" className="flex items-center justify-center">
          <div className="relative mr-4 h-8 w-8">
            <Shapes className="absolute h-full w-full text-primary" />
          </div>
          <h1 className="text-lg md:text-2xl font-bold">TaskQuill</h1>
        </Link>

        <SignedIn>
          <Link href={"/dashboard"}>
            <Button className="rounded-full px-6">Dashboard</Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-row space-x-4">
            <Link href={"/sign-in"}>
              <Button className="rounded-full px-6">Sign In</Button>
            </Link>
            <Link className="hidden md:block" href={"/sign-up"}>
              <Button variant={"outline"} className="rounded-full px-6">
                Sign Up
              </Button>
            </Link>
          </div>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Navbar;
