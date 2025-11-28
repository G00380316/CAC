import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import SundaySchool from "../models/ss.js";
import WFT from "../models/wft.js";
import { connectMongoDB } from "../lib/mongo.js";

import * as cheerio from "cheerio";

const router = express.Router();

dotenv.config();

router.get("/", (req, res) => {
  res.send(`
        <html>
            <body>
                <h1>Mobile Route</h1>
            </body>
        </html>
    `);
});

router.get("/wft", async (req, res) => {
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

    let uploadedData;

    if (text && title && date && bibleRef && byline && audio) {
      const wft = await WFT.findOne().sort({ createdAt: -1 });
      if (wft.text != text) {
        uploadedData = await WFT.create({
          text,
          title,
          date,
          bibleRef,
          byline,
          audio,
        });
      } else {
        text = wft.text;
        title = wft.title;
        date = wft.date;
        bibleRef = wft.bibleRef;
        byline = wft.byline;
        audio = wft.audio;
      }
    }

    res.status(201).json({
      response: { text, title, date, bibleRef, byline, audio },
      message: "Scraping completed successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/ss", async (req, res) => {
  connectMongoDB();

  try {
    const sundaySchool = await SundaySchool.findOne().sort({ createdAt: -1 });

    res.status(201).json({
      response: { sundaySchool },
      message: "Successful SundaySchool retrieved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
