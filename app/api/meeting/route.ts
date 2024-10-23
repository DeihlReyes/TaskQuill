import { NextResponse } from "next/server";

import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { meetingSchema } from "@/lib/validation/meeting";

export async function POST(req: Request) {
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

    const res = await prismaDB.meeting.create({
      data: {
        title,
        description,
        date,
        link,
        userId: currentProfile.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Meeting Created Successfully", data: res }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await prismaDB.meeting.findMany({
      where: {
        userId: currentProfile.id,
      },
      orderBy: {
        created: "desc",
      },
    });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
