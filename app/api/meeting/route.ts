import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentProfile = await profile();
        const data = await req.json();

        if(!currentProfile){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const { title, description, date, link, user } = data;

        const res = await prismaDB.meeting.create({
            data: {
                title,
                description,
                date,
                link,
                userId: currentProfile.id
            },
        });

        return new NextResponse("Meeting Created Successfully", {status: 200});
    } catch (error) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
};