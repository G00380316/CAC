import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import axios from "axios";
import { connectMongoDB } from "@/lib/mongo";
import SundaySchool from "@/models/ss";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }


    try {
        const { data: blogData } = await axios.get(process.env.NEXT_PUBLIC_SS_BLOG_URL);

        let $ = cheerio.load(blogData)

        const ListBlogs = $('.wp-block-post-title a[href]');

        let blogs = []

        ListBlogs.each((idx, el) => {
            blogs.push($(el).attr('href'))
        });

        blogs = blogs.reverse()
        const latestBlogUrl = blogs.pop()

        const { data } = await axios.get(latestBlogUrl);

        $ = cheerio.load(data);

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
