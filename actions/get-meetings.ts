import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";

export const getMeetings = async () => {
    const currentProfile = await profile();

    const meetings = await prismaDB.meeting.findMany({
        where: {
            OR: [
                {
                    userId: currentProfile.id,
                },
            ],
        },
        orderBy: {
            created: "desc",
        },
    });

    return meetings;
};