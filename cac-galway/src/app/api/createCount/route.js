import { connectMongoDB } from "@/lib/mongo";
import Counter from "@/models/counter";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const { date } = await req.json();

        await connectMongoDB();
        const counter = await Counter.create({ date, count: 1 })

        return NextResponse.json({ counter, message: "Count has been created" }, { status: 201 });
    } catch (error) {
        //console.log(error);
        return NextResponse.json({ error })
    }
}
