import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentProfile = await profile();
        const { title, description, projectTag } = await req.json();

        if(!currentProfile){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const res = await prismaDB.project.create({
            data: {
                title,
                description,
                ownerId: currentProfile.id,
                projectTag: projectTag,
            }
        });

        return new NextResponse("Project Created Successfully", {status: 200});
    } catch (error) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
};