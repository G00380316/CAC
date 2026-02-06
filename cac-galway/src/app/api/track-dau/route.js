import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo";
import DailyUser from "@/models/dailyUser";
import DailyCounter from "@/models/dailyCounter";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const getDate = () => new Date().toISOString().slice(0, 10);

export async function POST(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        await connectMongoDB();

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
        const ua = req.headers.get("user-agent") || "unknown";
        const today = getDate();

        // Create a unique fingerprint for today
        const fingerprint = crypto
            .createHash("sha256")
            .update(`${ip}-${ua}-${today}`)
            .digest("hex");

        try {
            // 1. Attempt to record the unique visit for today
            // Note: This relies on a UNIQUE index on (fingerprint, date)
            await DailyUser.create({
                date: today,
                fingerprint,
            });

            // 2. If the code reaches here, it's a NEW user for today
            const counter = await DailyCounter.findOneAndUpdate(
                { date: today },
                { $inc: { count: 1 } },
                { upsert: true, new: true }
            );

            return NextResponse.json({
                isNewUser: true,
                count: counter.count,
            });

        } catch (err) {
            // 3. If error code 11000, the user already exists for today
            if (err.code === 11000) {
                const counter = await DailyCounter.findOne({ date: today });
                return NextResponse.json({
                    isNewUser: false,
                    count: counter?.count || 0,
                });
            }
            throw err; // Re-throw if it's a different DB error
        }

    } catch (err) {
        console.error("Tracking Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
