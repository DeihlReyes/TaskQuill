// api/updateTaskStatus/[taskId].ts
import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { taskId: string } }
) {
  try {
    const currentProfile = await profile();

    if (!currentProfile) {
      return redirect('/sign-in');
    }
    const taskId = params.taskId;
    const { label } = await req.json();
    // Update the status of the task
    const updatedTask = await prismaDB.task.update({
      where: {
        id: taskId,
      },
      data: {
        label: label,
      },
    });

    return NextResponse.json({ updatedTask });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
