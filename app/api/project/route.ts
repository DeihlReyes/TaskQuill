import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "@/lib/validation/project";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parseResult = createProjectSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, description, projectTag } = parseResult.data;

    const res = await prismaDB.project.create({
      data: {
        title,
        description,
        projectTag,
        ownerId: currentProfile.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Project Created Successfully", data: res }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 },
    );
  }
}
