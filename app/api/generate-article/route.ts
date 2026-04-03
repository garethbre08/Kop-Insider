import { NextRequest, NextResponse } from "next/server";
import { generateArticle } from "@/lib/andy";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      sourceHeadline,
      sourceContent,
      sourceJournalist,
      sourceOutlet,
      sourceUrl,
      articleType,
      isFeatured,
    } = body;

    await generateArticle({
      sourceHeadline,
      sourceContent,
      sourceJournalist,
      sourceOutlet,
      sourceUrl,
      articleType,
      isFeatured,
    });

    return NextResponse.json(
      { message: "Article generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Generate article error:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
