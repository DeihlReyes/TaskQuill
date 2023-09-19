import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Get the current user's profile
        const currentProfile = await profile();

        // If the user is not logged in, return an error
        if (!currentProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let tasks: Task[];

        tasks = await prismaDB.task.findMany({
            where: {
                userId: currentProfile.id,
            },
            orderBy: {
                created: "desc",
            },
        });

        return NextResponse.json({Task: tasks});
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}