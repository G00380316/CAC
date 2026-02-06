
import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import axios from "axios";
import WFT from "@/models/wft";
import { connectMongoDB } from "@/lib/mongo";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const { data } = await axios.get(process.env.NEXT_PUBLIC_WFT_URL);

        const $ = cheerio.load(data)

        const listItemsText = $("div.field-item.even[property='content:encoded']");
        const listItemsTitle = $("div.panel-pane.pane-node-title");
        const listItemsDate = $(".field-name-field-date-time");
        const listItemsBibleRef = $(".field-name-field-bible-reference");
        const listItemsByline = $(".field-name-field-byline");
        const listItemsAudio = $(".field-name-field-podcast");


        let text;
        let title;
        let date;
        let bibleRef;
        let byline;
        let audio;

        connectMongoDB();

        // Iterate through each list item and extract text
        listItemsText.each((idx, el) => {
            text = $(el).children() + "\n\n\n\n";
        });
        listItemsTitle.each((idx, el) => {
            title = $(el).children() + "\n\n\n\n";
        });
        listItemsDate.each((idx, el) => {
            date = $(el).children() + "\n\n\n\n";
        });
        listItemsBibleRef.each((idx, el) => {
            bibleRef = $(el).children() + "\n\n\n\n";
        });
        listItemsByline.each((idx, el) => {
            byline = $(el).children() + "\n\n\n\n";
        });
        listItemsAudio.each((idx, el) => {
            audio = $(el).children() + "\n\n";
        });

        let uploadedData

        if (text && title && date && bibleRef && byline && audio) {
            uploadedData = await WFT.create({ text, title, date, bibleRef, byline, audio });
        }

        return NextResponse.json({ data: { text, title, date, bibleRef, byline, audio }, message: "Scraping completed successfully!" });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
