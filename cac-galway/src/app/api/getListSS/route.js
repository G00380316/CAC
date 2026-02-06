import { connectMongoDB } from "@/lib/mongo";
import SundaySchool from "@/models/ss";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        await connectMongoDB();

        const sundaySchools = await SundaySchool.find().sort({ createdAt: -1 });

        return NextResponse.json({ sundaySchools });
    } catch (error) {
        //console.log(error);
        return NextResponse.json({ error })
    }
}

