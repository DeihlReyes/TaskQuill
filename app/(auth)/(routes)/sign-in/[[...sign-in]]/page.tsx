import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex h-screen justify-center items-center">
      <div className="bg-primary/10 w-full py-6 px-12 mt-10 absolute top-20 rounded-xl">
          <h2 className="text-base mb-2">Demo Account: </h2>
          <p className="text-sm">Email: demo+clerk_test@gmail.com</p>
          <p className="text-sm">Password: thisisdemo123</p>
      </div>
      <SignIn />
    </div>
);
}
