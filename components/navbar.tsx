import { profile } from "@/lib/profile";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
    const userProfile = await profile();
    const currentDate = new Date();

    // Format the date using toLocaleDateString()
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    return ( 
    <div className="flex w-full items-center p-8">
      <div className="flex w-full justify-between">
        <div>
            <p className="font-bold text-md">Welcome back, {userProfile.name}</p>
            <p>{formattedDate}</p>
        </div>
        <div className="my-auto">
            <UserButton afterSignOutUrl="/" 
            appearance={{
                    elements:{
                        userButtonAvatarBox: { // Target the userButtonAvatar element
                            width: '45px',    // Increase the width of the avatar
                            height: '45px',
                        }
                    }
                }}/>
        </div>
      </div>
    </div>
   );
}
 
export default Navbar;