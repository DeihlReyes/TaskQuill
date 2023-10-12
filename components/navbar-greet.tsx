import { profile } from "@/lib/profile";

const NavbarGreeter = async () => {
    const currentUser = await profile();
    const date = new Date().toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});
    return(
        <div className="hidden md:block">
            <h1 className="font-bold text-lg">Welcome Back, {currentUser.name}</h1>
            <h2>{date}</h2>
        </div>
        

    );
};

export default NavbarGreeter;