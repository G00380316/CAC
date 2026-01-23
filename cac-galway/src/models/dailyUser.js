import mongoose, { Schema, models } from "mongoose";

const DailyUserSchema = new Schema(
	{
		date: {
			type: String, // format: YYYY-MM-DD
			required: true,
		},
		fingerprint: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

DailyUserSchema.index({ date: 1, fingerprint: 1 }, { unique: true });

DailyUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const DailyUser = models.DailyUser || mongoose.model("DailyUser", DailyUserSchema);

DailyUser.createIndexes().catch(err => console.error("Index sync error:", err));

export default DailyUser;
