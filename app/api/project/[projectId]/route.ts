import { NextResponse } from "next/server";

import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { projectSchema } from "@/lib/validation/project";

export async function PUT(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parseResult = projectSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, description, projectTag } = parseResult.data;

    const project = await prismaDB.project.findUnique({
      where: { id: params.projectId },
    });

    if (!project) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.project.update({
      where: { id: params.projectId },
      data: {
        title,
        description,
        projectTag,
        ownerId: currentProfile.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Project Updated Successfully", data: res }),
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
  { params }: { params: { projectId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prismaDB.project.findUnique({
      where: { id: params.projectId },
    });

    if (!project) {
      return new NextResponse(
        JSON.stringify({ message: "Project Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.project.delete({
      where: { id: params.projectId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Meeting Project Successfully", data: res }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
