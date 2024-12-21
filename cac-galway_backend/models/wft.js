import mongoose from "mongoose";

const { Schema, models } = mongoose;

const WFTSchema = new Schema({
    title: {
        type: String,
    },
    date: {
        type: String,
        unique: true,
    },
    bibleRef: {
        type: String,
    },
    byline: {
        type: String,
    },
    audio: {
        type: String,
    },
    text: {
        type: String,
    },
},
    { timestamps: true }
);


const WFT = models.WFT || mongoose.model('WFT', WFTSchema);
export default WFT;

