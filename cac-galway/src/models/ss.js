import mongoose, { Schema, models } from "mongoose";

const SundaySchoolSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    text: {
        type: String,
    },
},
    { timestamps: true }
);


const SundaySchool = models.SundaySchool || mongoose.model('SundaySchool', SundaySchoolSchema);

export default SundaySchool;
