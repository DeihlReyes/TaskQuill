import { profile } from "@/lib/profile"
import { UserButton } from "@clerk/nextjs";

export const Home = async () => {
  const userProfile = await profile();
  const { name } = userProfile;
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center">
          Hi {name}, welcome to your dashboard!
        </div>
        <UserButton afterSignOutUrl="/" />
      </main>
    )
}

export default Home;
  