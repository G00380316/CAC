import { connectMongoDB } from "@/lib/mongo";
import Counter from "@/models/counter";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const { date } = await req.json();

        await connectMongoDB();

        const counter = await Counter.findOneAndUpdate(
            { date },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );

        return NextResponse.json({ counter, message: "Count updated or created" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
