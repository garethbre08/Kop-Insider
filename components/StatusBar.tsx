"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";

type CrawlStatus = {
  total: number;
  lastCrawl: string | null;
  byCategory: Record<string, number>;
};

const isDev = process.env.NODE_ENV === "development";

export default function StatusBar() {
  const [status, setStatus] = useState<CrawlStatus | null>(null);

  useEffect(() => {
    if (!isDev) return;

    async function fetchStatus() {
      try {
        const res = await fetch("/api/crawl-status");
        if (res.ok) setStatus(await res.json());
      } catch {
        // silent — dev tool only
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!isDev) return null;

  if (!status) {
    return (
      <div className="bg-ki-charcoal px-4 py-1 text-center">
        <span className="text-ki-white text-xs opacity-30">Loading status…</span>
      </div>
    );
  }

  const categoryParts = Object.entries(status.byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, count]) => `${cat}: ${count}`)
    .join(" · ");

  return (
    <div className="bg-ki-charcoal px-4 py-1 flex items-center justify-center gap-3 flex-wrap">
      <span className="text-ki-white text-xs opacity-50">
        Total Articles: <span className="opacity-100 font-semibold">{status.total}</span>
      </span>
      <span className="text-ki-white opacity-20 text-xs">·</span>
      <span className="text-ki-white text-xs opacity-50">
        Last Crawl:{" "}
        <span className="opacity-100 font-semibold">
          {status.lastCrawl ? timeAgo(status.lastCrawl) : "never"}
        </span>
      </span>
      {categoryParts && (
        <>
          <span className="text-ki-white opacity-20 text-xs">·</span>
          <span className="text-ki-white text-xs opacity-40">{categoryParts}</span>
        </>
      )}
    </div>
  );
}
