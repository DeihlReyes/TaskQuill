import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex h-screen w-full max-w-[400px] items-center justify-center">
      <div className="absolute top-10 mt-10 w-full rounded-xl bg-primary/10 px-12 py-6 md:top-20">
        <h2 className="mb-2 text-base">Demo Account: </h2>
        <p className="text-sm">Email: demo+clerk_test@gmail.com</p>
        <p className="text-sm">Password: thisisdemo123</p>
      </div>
      <SignIn />
    </div>
  );
}
