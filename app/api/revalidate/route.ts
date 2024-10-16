import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { path } = await req.json(); // Parse the body of the request to get the path

		if (path) {
			// Trigger revalidation for the given path
			revalidatePath(path);
			return NextResponse.json({ revalidated: true });
		} else {
			return NextResponse.json(
				{ error: "No path provided for revalidation." },
				{ status: 400 }
			);
		}
	} catch (error) {
		return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
	}
}
