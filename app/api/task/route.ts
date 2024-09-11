import { getTasks } from "@/actions/get-task";
import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { Task, taskSchema } from "@/lib/validation/task";
import { auth } from "@clerk/nextjs/server";
import { TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parseResult = taskSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, description, priority, label, projectId, dueDate } =
      parseResult.data;

    const project = await prismaDB.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        task: true,
      },
    });

    const tasks = project?.task;
    const projectTag = project?.projectTag;
    const taskID = tasks?.map((task) => task.id.split("-")[1]);
    const taskIDNumbers = taskID?.map((id) => parseInt(id));

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
        priority,
        dueDate,
        projectId: projectId,
        label,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Task Created Successfully", data: res }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await prismaDB.task.findMany({
      where: {
        userId: currentProfile.id,
      },
      orderBy: {
        created: "asc",
      },
    });

    const tasks = data as Task[];
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 },
    );
  }
}
