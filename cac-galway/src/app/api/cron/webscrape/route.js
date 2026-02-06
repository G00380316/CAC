import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const response = await fetch("/api/webscrape/wft");

        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
