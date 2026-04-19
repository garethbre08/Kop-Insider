import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { runCrawler } from "@/lib/crawler";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runAndRespond();
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runAndRespond();
}

async function runAndRespond() {
  try {
    const summary = await runCrawler();

    console.log(`[/api/crawl] Headlines found before generation: ${summary.newArticlesFound}`);

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
      { ...summary, crawledAt: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[/api/crawl] Crawler failed:", error);
    return NextResponse.json(
      { error: "Crawler failed", message, stack },
      { status: 500 }
    );
  }
}
