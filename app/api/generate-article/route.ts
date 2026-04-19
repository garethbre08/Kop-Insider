import { NextRequest, NextResponse } from "next/server";
import { generateArticle } from "@/lib/andy";
import { runCrawler } from "@/lib/crawler";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await req.text();

  // No body — run the full crawler pipeline
  if (!raw || raw.trim() === "") {
    console.log("[API] No body provided — running full crawler pipeline");
    try {
      const summary = await runCrawler();
      console.log(`[API] Crawler complete. New: ${summary.newArticlesFound} | Generated: ${summary.articlesGenerated}`);

      if (summary.newArticlesFound === 0) {
        return NextResponse.json(
          { message: "No headlines available to process", ...summary, crawledAt: new Date().toISOString() },
          { status: 200 }
        );
      }

      revalidatePath("/");
      revalidatePath("/transfer-talk");
      revalidatePath("/injuries");
      revalidatePath("/opinion");

      return NextResponse.json(
        { message: "Crawler ran successfully", ...summary, crawledAt: new Date().toISOString() },
        { status: 200 }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      console.error("[API] Crawler failed:", error);
      return NextResponse.json({ error: "Crawler failed", message, stack }, { status: 500 });
    }
  }

  // Body present — generate a single article from the provided source data
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Failed to parse request body:", error);
    return NextResponse.json({ error: "Invalid request body", message }, { status: 400 });
  }

  try {
    const {
      sourceHeadline,
      sourceContent,
      sourceJournalist,
      sourceOutlet,
      sourceUrl,
      articleType,
      isFeatured,
    } = body as {
      sourceHeadline: string;
      sourceContent: string;
      sourceJournalist: string;
      sourceOutlet: string;
      sourceUrl: string;
      articleType: "news" | "transfers" | "injuries" | "opinion" | "match-reaction";
      isFeatured?: boolean;
    };
    console.log(`[API] Generating article for headline: "${sourceHeadline}" (type: ${articleType})`);

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
