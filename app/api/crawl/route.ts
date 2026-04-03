import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { runCrawler } from "@/lib/crawler";

// Vercel cron sends GET with Authorization: Bearer [CRON_SECRET]
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!auth || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runAndRespond();
}

// Manual trigger sends POST with x-api-key: [CRON_SECRET]
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return runAndRespond();
}

async function runAndRespond() {
  try {
    const summary = await runCrawler();

    revalidatePath("/");
    revalidatePath("/transfer-talk");
    revalidatePath("/injuries");
    revalidatePath("/opinion");

    return NextResponse.json(
      { ...summary, crawledAt: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/crawl] Crawler failed:", error);
    return NextResponse.json({ error: "Crawler failed" }, { status: 500 });
  }
}
