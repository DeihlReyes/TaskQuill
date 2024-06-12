import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";

export const getMeetings = async () => {
    const currentProfile = await profile();

    const meetings = await prismaDB.meeting.findMany({
        where: {
            userId: currentProfile.id,
        },
        orderBy: {
            created: "desc",
        },
    });

    return meetings;
};