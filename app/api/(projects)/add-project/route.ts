import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";
import { prismaDB } from "@/lib/prismaDb";

export async function POST(req: Request) {
    try {
        const currentProfile = await profile();
        const { title, description } = await req.json();

        if (!currentProfile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const project = await prismaDB.project.create({
            data: {
                title,
                description,
                userId: currentProfile.id,
            }
        });

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}