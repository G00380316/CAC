import { connectMongoDB } from "@/lib/mongo";
import SundaySchool from "@/models/ss";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectMongoDB();

        const sundaySchool = await SundaySchool.findOne().sort({ createdAt: -1 });

        return NextResponse.json({ sundaySchool });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}

