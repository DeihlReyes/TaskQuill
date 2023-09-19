import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";
import { prismaDB } from "@/lib/prismaDb";
import { Project } from "@prisma/client";

export async function GET() {
    try {
        const currentProfile = await profile();

        if (!currentProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let projects: Project[];

        projects = await prismaDB.project.findMany({
            where: {
                userId: currentProfile.id,
            },
            include: {
                task: true,
            },
            orderBy: {
                created: "desc",
            },
        });

        return NextResponse.json({Projects: projects});
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}