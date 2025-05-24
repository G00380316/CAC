import { connectMongoDB } from "@/lib/mongo";
import Counter from "@/models/counter";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectMongoDB();

        const counter = await Counter.findOne().sort({ createdAt: -1 });

        return NextResponse.json({ counter });
    } catch (error) {
        //console.log(error);
        return NextResponse.json({ error })
    }
}
