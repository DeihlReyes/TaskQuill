import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Label, Priority, TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, description, priority, label, projectId } = await req.json();
        const currentProfile = await profile();

        if (!currentProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const prioritValue = mapPriority(priority);
        const labelValue = mapLabel(label);

        if (!prioritValue || !labelValue) {
            return new NextResponse("Invalid priority or label", { status: 400 });
        }

        const taskNumber = await prismaDB.task.count() + 1;

        const res = await prismaDB.task.create({
            data: {
                id: `Task-${taskNumber}`,
                title,
                description,
                status: TaskStatus.TODO,
                priority: prioritValue,
                projectId: projectId,
                userId: currentProfile.id,
                label: labelValue,
            },
        });

        return new NextResponse("Task Created Successfully", { status: 200 });
    } catch (error) {
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
