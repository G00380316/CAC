import mongoose, { Schema, models } from "mongoose";

const DailyCounterSchema = new Schema({
	date: {
		type: String,
		unique: true,
	},
	count: {
		type: Number,
		default: 0,
	},
},
	{ timestamps: true }
);


const DailyCounter = models.DailyCounter || mongoose.model('DailyCounter', DailyCounterSchema);
export default DailyCounter;

