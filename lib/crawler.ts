import RSSParser from "rss-parser";
import { supabase } from "./supabase";
import { generateArticle } from "./andy";

const parser = new RSSParser();

const SOURCES = [
  {
    journalist: "James Pearce",
    outlet: "The Athletic",
    rssUrl: "https://theathletic.com/author/james-pearce/feed/",
    twitterHandle: "JamesPearceLFC",
  },
  {
    journalist: "Ian Doyle",
    outlet: "Liverpool Echo",
    rssUrl: "https://www.liverpoolecho.co.uk/sport/football/football-news/?service=rss",
    twitterHandle: "IanDoyleSport",
  },
  {
    journalist: "Paul Gorst",
    outlet: "Liverpool Echo",
    rssUrl: "https://www.liverpoolecho.co.uk/sport/football/football-news/?service=rss",
    twitterHandle: "ptgorst",
  },
  {
    journalist: "Paul Joyce",
    outlet: "The Times",
    rssUrl: "https://www.thetimes.co.uk/sport/football/premier-league/liverpool/?format=rss",
    twitterHandle: "_pauljoyce",
  },
  {
    journalist: "Simon Hughes",
    outlet: "The Athletic",
    rssUrl: "https://theathletic.com/author/simon-hughes/feed/",
    twitterHandle: "simon_hughes__",
  },
];

const LIVERPOOL_KEYWORDS = ["liverpool", "lfc", "anfield", "slot", "reds"];

const TRANSFER_KEYWORDS = ["transfer", "signing", "bid", "deal", "window"];
const INJURY_KEYWORDS = ["injury", "injured", "out", "return", "fitness"];
const MATCH_KEYWORDS = ["match", "result", "goal", "win", "loss", "draw", "preview"];

type ArticleType = "news" | "transfers" | "injuries" | "opinion" | "match-reaction";

type CrawledItem = {
  title: string;
  content: string;
  link: string;
  pubDate: string;
};

type Source = (typeof SOURCES)[number];

export async function crawlRSSFeed(source: Source): Promise<CrawledItem[]> {
  try {
    const feed = await parser.parseURL(source.rssUrl);

    const items = (feed.items ?? [])
      .slice(0, 10)
      .filter((item) => {
        const text = `${item.title ?? ""} ${item.contentSnippet ?? ""} ${item.content ?? ""}`.toLowerCase();
        return LIVERPOOL_KEYWORDS.some((kw) => text.includes(kw));
      })
      .slice(0, 3)
      .map((item) => ({
        title: item.title ?? "",
        content: item.contentSnippet ?? item.content ?? item.summary ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
      }));

    return items;
  } catch (error) {
    console.error(`[Crawler] Failed to fetch RSS for ${source.journalist}:`, error);
    return [];
  }
}

export async function isArticleAlreadyCrawled(url: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("articles")
    .select("id")
    .eq("source_url", url)
    .limit(1);

  if (error) {
    console.error("[Crawler] Supabase check error:", error);
    return false;
  }

  return (data?.length ?? 0) > 0;
}

function detectArticleType(title: string): ArticleType {
  const lower = title.toLowerCase();
  if (TRANSFER_KEYWORDS.some((kw) => lower.includes(kw))) return "transfers";
  if (INJURY_KEYWORDS.some((kw) => lower.includes(kw))) return "injuries";
  if (MATCH_KEYWORDS.some((kw) => lower.includes(kw))) return "match-reaction";
  return "news";
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runCrawler(): Promise<{
  sourcesCrawled: number;
  newArticlesFound: number;
  articlesGenerated: number;
}> {
  let newArticlesFound = 0;
  let articlesGenerated = 0;

  for (const source of SOURCES) {
    console.log(`[Crawler] Crawling ${source.journalist} (${source.outlet})...`);

    const items = await crawlRSSFeed(source);
    console.log(`[Crawler] Found ${items.length} Liverpool-related items from ${source.journalist}`);

    for (const item of items) {
      if (!item.link) continue;

      const alreadyCrawled = await isArticleAlreadyCrawled(item.link);
      if (alreadyCrawled) {
        console.log(`[Crawler] Skipping (already crawled): "${item.title}"`);
        continue;
      }

      newArticlesFound++;
      console.log(`[Crawler] New article found: "${item.title}"`);

      const articleType = detectArticleType(item.title);
      console.log(`[Crawler] Detected type: ${articleType} — Generating article...`);

      try {
        await generateArticle({
          sourceHeadline: item.title,
          sourceContent: item.content,
          sourceJournalist: source.journalist,
          sourceOutlet: source.outlet,
          sourceUrl: item.link,
          articleType,
        });
        articlesGenerated++;
        console.log(`[Crawler] Article generated successfully`);
      } catch (error) {
        console.error(`[Crawler] Failed to generate article for "${item.title}":`, error);
      }

      await delay(5000);
    }
  }

  const summary = {
    sourcesCrawled: SOURCES.length,
    newArticlesFound,
    articlesGenerated,
  };

  console.log(`[Crawler] Done. Sources: ${summary.sourcesCrawled} | New: ${summary.newArticlesFound} | Generated: ${summary.articlesGenerated}`);
  return summary;
}
