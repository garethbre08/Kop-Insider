import { NextRequest, NextResponse } from "next/server";
import { generateArticle } from "@/lib/andy";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
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
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[API] Generate article error:", error);
    return NextResponse.json(
      { error: "Failed to generate article", message, stack },
      { status: 500 }
    );
  }
}
