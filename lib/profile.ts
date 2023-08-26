import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { prismaDB } from "./prismaDb";

export const profile = async () => {
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    }

    const userProfile = await prismaDB.user.findUnique({
        where: {
            id: user.id,
        }
    });

    if (userProfile) {
        return userProfile
    }

    const newProfile = await prismaDB.user.create({
        data: {
            id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
        }
    });

    return newProfile;
};