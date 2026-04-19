import { NextRequest, NextResponse } from "next/server";
import { generateArticle } from "@/lib/andy";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (!raw || raw.trim() === '') {
      throw new Error('Empty response received: request body is empty');
    }
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
