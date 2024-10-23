import { NextResponse } from "next/server";

import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { meetingSchema } from "@/lib/validation/meeting";

export async function PUT(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parseResult = meetingSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, description, date, link } = parseResult.data;

    const meeting = await prismaDB.meeting.findUnique({
      where: { id: params.meetingId },
    });

    if (!meeting) {
      return new NextResponse(
        JSON.stringify({ message: "Meeting Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.meeting.update({
      where: { id: params.meetingId },
      data: {
        title,
        description,
        date,
        link,
        userId: currentProfile.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Meeting Updated Successfully", data: res }),
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
  { params }: { params: { meetingId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const meeting = await prismaDB.meeting.findUnique({
      where: { id: params.meetingId },
    });

    if (!meeting) {
      return new NextResponse(
        JSON.stringify({ message: "Meeting Not Found" }),
        { status: 404 }
      );
    }

    const res = await prismaDB.meeting.delete({
      where: { id: params.meetingId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Meeting Deleted Successfully", data: res }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
