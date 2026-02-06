

import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import axios from "axios";
import SundaySchool from "@/models/ss";
import { connectMongoDB } from "@/lib/mongo";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json()
    const targetUrl = body?.url

    try {
        const { data } = await axios.get(targetUrl);

        const $ = cheerio.load(data);

        const listItemsText = $(".entry-content");
        const listItemsTitle = $(".wp-block-cover__inner-container > div:nth-child(1) > div:nth-child(1)");


        connectMongoDB();

        let text
        let title

        listItemsText.each((idx, el) => {
            text = $(el).children() + "\n";
        });

        text = text.replaceAll('<p', '</br><blockquote')
        text = text.replaceAll('</p>', '</blockquote></br>')
        text = text.replaceAll('<p>', '</br><blockquote>')

        listItemsTitle.each((idx, el) => {
            title = $(el).children() + "\n";
        });

        let uploadedData

        if (text && title) {
            uploadedData = await SundaySchool.create({ text, title });
        }


        return NextResponse.json({ repsonse: { text, title }, message: "Scraping completed successfully!" });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
