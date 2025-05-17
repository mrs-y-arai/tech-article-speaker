import { NextRequest, NextResponse } from "next/server";
import { SummarizeBookmarkUseCase } from "~/server/services/SummarizeBookmarkUseCase";
import { summarizeBookmarkRequestSchema } from "~/schemas/request/bookmark";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const parsedRequest = summarizeBookmarkRequestSchema.safeParse(requestBody);

    if (!parsedRequest.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 422 });
    }

    const { bookmarkId, userId } = parsedRequest.data;

    const summarizeBookmarkUseCase = await SummarizeBookmarkUseCase();

    await summarizeBookmarkUseCase.execute({ bookmarkId, userId });

    return NextResponse.json(
      { message: "Bookmark summarized" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
