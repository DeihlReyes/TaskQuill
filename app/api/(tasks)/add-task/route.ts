import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Label, Priority, Task, TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function POST(req: Request) {
    try {
        const { title, description, priority, label, projectId } = await req.json();
        const currentProfile = await profile();

        if (!currentProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Map priority and label string values to enum values
        const prioritValue = mapPriority(priority);
        const labelValue = mapLabel(label);

        if (!prioritValue || !labelValue) {
            return new NextResponse("Invalid priority or label", { status: 400 });
        }

        const taskNumber = await prismaDB.task.count() + 1;

        await prismaDB.task.create({
            data: {
                id: `Task-${taskNumber}`,
                title,
                description,
                status: TaskStatus.TODO,
                priority: prioritValue,
                label: labelValue,
                projectId,
                userId: currentProfile.id,
            },
        });

        // Return a success response
        return new NextResponse("Task created successfully" , { status: 200 });

    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

function mapPriority(priority: string): Priority | null {
    switch (priority) {
        case "LOW":
            return Priority.LOW;
        case "MEDIUM":
            return Priority.MEDIUM;
        case "HIGH":
            return Priority.HIGH;
        default:
            return null; // Invalid priority
    }
}

function mapLabel(label: string): Label | null {
    switch (label) {
        case "BUG":
            return Label.BUG;
        case "FEATURE":
            return Label.FEATURE;
        case "IMPROVEMENT":
            return Label.IMPROVEMENT;
        case "REFACTOR":
            return Label.REFACTOR;
        case "TEST":
            return Label.TEST;
        case "DOCUMENTATION":
            return Label.DOCUMENTATION;
        default:
            return null; // Invalid label
    }
}
