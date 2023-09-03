import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";
import { prismaDB } from "@/lib/prismaDb";
import { Project } from "@prisma/client";

export async function GET() {
    try {
        const currentProfile = await profile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let projects: Project[];

        projects = await prismaDB.project.findMany({
            where: {
                userId: currentProfile.id,
            },
            include: {
                task: true,
            }
        });

        return NextResponse.json({
            projects, 
            status: 200
        });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}