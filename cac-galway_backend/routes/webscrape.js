import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import SundaySchool from '../models/ss.js';
import WFT from '../models/wft.js';
import { connectMongoDB } from '../lib/mongo.js';

import * as cheerio from 'cheerio';

import fs from 'fs';

const router = express.Router();

dotenv.config();

router.get('/', (req, res) => {
    res.send(`Hello, this is the Webscraping Route`);
});

router.get('/wft', async (req, res) => {
    try {

        const { data } = await axios.get(process.env.WFT_SCRAPE_URL);

        const $ = cheerio.load(data);

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

        console.log("New Data", uploadedData);



        res.status(201).json({ response: { text, title, date, bibleRef, byline, audio }, message: "Scraping completed successfully!" });

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
});

router.get('/ss', async (req, res) => {
    try {

        const { data } = await axios.get(process.env.SS_SCRAPE_URL);

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

        console.log("New Data", uploadedData);

        res.status(201).json({ response: { text, title }, message: "Scraping completed successfully!" });

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
});

router.get('/oldss', async (req, res) => {
    try {

        const { data } = await axios.get(process.env.SS_SCRAPE_URL);

        const $ = cheerio.load(data);

        const listItemsText = $(".entry-content");
        const listItemsTitle = $(".wp-block-cover__inner-container > div:nth-child(1) > div:nth-child(1)");


        //connectMongoDB();

        let text
        let title

        listItemsText.each((idx, el) => {
            text = $(el).children() + "\n";
        });

        listItemsTitle.each((idx, el) => {
            title = $(el).children() + "\n";
        });

        let uploadedData

        if (text && title) {
            //   uploadedData = await SundaySchool.create({ text, title });
        }

        console.log("New Data", uploadedData);

        res.status(201).json({ response: { text, title }, message: "Scraping completed successfully!" });

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
});

export default router;
