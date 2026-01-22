import { connectMongoDB } from "@/lib/mongo";
import WFT from "@/models/wft";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
	try {
		await connectMongoDB();

		const wordfortoday = await WFT.findById(params.id);

		if (!wordfortoday) {
			return NextResponse.json(
				{ error: "Not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ wordfortoday });
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}
}

