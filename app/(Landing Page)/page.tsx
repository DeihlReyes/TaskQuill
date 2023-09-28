'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center mb-5">
        Welcome to TaskQuill
      </div>
      <div className="flex flex-row gap-5 justify-between">
        <Button onClick={() => {router.push("/sign-in")}}>Login</Button>
        <Button onClick={() => {router.push("/sign-up")}}>Sign Up</Button>
      </div>
    </main>
  )
}
