import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }

  const articles = data ?? [];
  const total = articles.length;
  const lastCrawl = articles[0]?.created_at ?? null;

  const byCategory = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ total, lastCrawl, byCategory });
}
