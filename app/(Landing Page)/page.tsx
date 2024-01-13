import Link from "next/link";
import Navbar from "./components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen flex-col justify-between">
      <Navbar />
      <section className="my-auto flex h-fit flex-col items-center justify-center">
        <div className="flex max-w-4xl flex-col items-center justify-center space-y-12">
          <h1 className="text-center text-3xl md:text-6xl font-bold">
            TaskQuill: Master Your Tasks, Boost Your Efficiency.
          </h1>
          <p className="px-8 md:px-16 text-center text-sm md:text-lg">
            Elevate Your Task Management with Taskquill. Your essential hub for
            seamless organization, effortless task mastery, and heightened
            productivity. Taskquill redefines task management, offering
            precision and control for a streamlined workflow.
          </p>

          <Link href={"/dashboard"}>
            <Button className="rounded-full px-12 md:px-16 py-6 text-white">
              Try for free!
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
