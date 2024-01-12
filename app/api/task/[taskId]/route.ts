import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { taskSchema, updateTaskSchema } from "@/lib/validation/task";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parseResult = updateTaskSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, description, status, priority, label, projectId, dueDate } = parseResult.data;

    const project = await prismaDB.project.findUnique({ where: { id: params.id } });

    if (!project) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 },
      );
    }

    const res = await prismaDB.task.update({
      where: { id: params.id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        projectId,
        label,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Task Updated Successfully", data: res }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prismaDB.project.findUnique({ where: { id: params.id } });

    if (!project) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 },
      );
    }

    const res = await prismaDB.project.delete({ where: { id: params.id } });

    return new NextResponse(
      JSON.stringify({ message: "Task Deleted Successfully", data: res }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 },
    );
  }
}
