import { NextResponse } from "next/server";

import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { taskSchema, updateTaskSchema } from "@/lib/validation/task";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    // const parseResult = updateTaskSchema.safeParse(body);

    // if (!parseResult.success) {
    //   console.error(parseResult.error);
    //   return Response.json({ error: "Invalid input" }, { status: 400 });
    // }

    const task = await prismaDB.task.findUnique({
      where: { id: params.taskId },
    });

    if (!task) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.task.update({
      where: { id: params.taskId },
      data: body,
    });

    return new NextResponse(
      JSON.stringify({ message: "Task Updated Successfully", data: res }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prismaDB.task.findUnique({
      where: { id: params.taskId },
    });

    if (!task) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.task.delete({ where: { id: params.taskId } });

    return new NextResponse(
      JSON.stringify({ message: "Task Deleted Successfully", data: res }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
