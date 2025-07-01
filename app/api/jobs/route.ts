import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const q = searchParams.get("q")|| undefined;
    const type = searchParams.get('type') || undefined;
    const location = searchParams.get('location') || undefined;

    const jobs = await prisma.job.findMany({
        where:{
            AND:[
                q 
                ? {
                OR: [
                    { title: { contains: q, mode: "insensitive" } },
                    { company: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                ],
                }
                :{},
                type ? { type: type } : {},
                location ? {location:{ contains: location, mode: "insensitive" }} : {},
            ],
        },
        orderBy:{postedAt:'desc'},
        include:{postedBy:true}
    });
    return NextResponse.json(jobs)
}

export async function POST(request: Request){
    const session = await requireAuth();

    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    try {
        const data = await request.json();
        const job = await prisma.job.create({
            data:{
                ...data, 
                postedById:session.user.id,
            },
        });

        return NextResponse.json(job);

    } catch (error) {
        console.error("Error creating job: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}