import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Label, Priority, TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, description, priority, label, projectId, dueDate } = await req.json();
        const currentProfile = await profile();

        if (!currentProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const prioritValue = mapPriority(priority);
        const labelValue = mapLabel(label);

        if (!prioritValue || !labelValue) {
            return new NextResponse("Invalid priority or label", { status: 400 });
        }

        const project = await prismaDB.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                task: true,
            },
        });

        //check the highest taskID but first remove the word "tasks-" from the id
        //get tasks from the project
        const tasks = project?.task;
        const projectTag = project?.projectTag;
        const taskID = tasks?.map((task) => task.id.split("-")[1]);
        const taskIDNumbers = taskID?.map(id => parseInt(id));

        let highestTaskID = 0;
        if (taskIDNumbers?.length === 0) {
            highestTaskID = 0;
        } else {
            highestTaskID = Math.max(...taskIDNumbers!);
        }
        const taskNumber = highestTaskID + 1;

        const res = await prismaDB.task.create({
            data: {
                id: `${projectTag}-${taskNumber}`,
                title,
                description,
                status: TaskStatus.TODO,
                priority: prioritValue,
                dueDate,
                assigneeId: currentProfile.id,
                projectId: projectId,
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
