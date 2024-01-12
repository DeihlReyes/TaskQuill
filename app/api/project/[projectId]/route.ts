import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const currentProfile = await profile();

        if (!currentProfile) {
            return redirect('/sign-in');
        }

        const projectId = params.projectId;

        const deletedTask = await prismaDB.project.delete({
            where: {
                id: projectId,
            },
        });

        return NextResponse.json({ deletedTask });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
