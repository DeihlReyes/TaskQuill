import { currentUser } from "@clerk/nextjs";
import { prismaDB } from "./prismaDb";
import { redirect } from "next/navigation";

export const profile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userProfile = await prismaDB.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (userProfile) {
    return userProfile;
  } else {
    const newProfile = await prismaDB.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
      },
    });

    return newProfile;
  }
};
