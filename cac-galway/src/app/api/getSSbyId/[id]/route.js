import { connectMongoDB } from "@/lib/mongo";
import SundaySchool from "@/models/ss";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
	try {
		await connectMongoDB();

		const sundaySchool = await SundaySchool.findById(params.id);

		if (!sundaySchool) {
			return NextResponse.json(
				{ error: "Not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ sundaySchool });
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}

