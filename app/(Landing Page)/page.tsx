"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-5 flex flex-col items-center justify-center">
        Welcome to TaskQuill
      </div>
      <div className="flex flex-row justify-between gap-5">
        <Button
          onClick={() => {
            router.push("/sign-in");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Sign Up
        </Button>
      </div>
    </main>
  );
}
