import { prismaDB } from "@/lib/prismaDb";
import { profile } from "@/lib/profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const currentProfile = await profile();

        if (!currentProfile) {
            return redirect("/sign-in");
        }

        const user = await prismaDB.user.findUnique({
            where: {
                id: params.userId,
            },
        });

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
