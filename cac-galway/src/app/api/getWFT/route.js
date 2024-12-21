import { connectMongoDB } from "@/lib/mongo";
import WFT from "@/models/wft";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectMongoDB();

        const wft = await WFT.findOne().sort({ createdAt: -1 });

        return NextResponse.json({ wft });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}
