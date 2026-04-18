import RSSParser from "rss-parser";
import { supabase } from "./supabase";
import { generateArticle } from "./andy";

const parser = new RSSParser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
  timeout: 10000,
});

const SOURCES = [
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
    journalist: "Liverpool Echo",
    outlet: "Liverpool Echo",
    rssUrl: "https://www.liverpoolecho.co.uk/sport/football/football-news/?service=rss",
    twitterHandle: "LivEchoLFC",
  },
  {
    journalist: "Dominic King",
    outlet: "Daily Mail",
    rssUrl: "https://www.dailymail.co.uk/sport/football/index.rss",
    twitterHandle: "DominicKing_DM",
  },
  {
    journalist: 'David Lynch',
    outlet: 'David Lynch LFC',
    rssUrl: 'https://www.davidlynchlfc.co.uk/feed',
    twitterHandle: 'davidlynchlfc',
  },
  {
    journalist: 'Andy Hunter',
    outlet: 'The Guardian',
    rssUrl: 'https://www.theguardian.com/football/liverpool/rss',
    twitterHandle: 'AHunterGuardian',
  },
  {
    journalist: 'Empire of the Kop',
    outlet: 'Empire of the Kop',
    rssUrl: 'https://www.empireofthekop.com/feed/',
    twitterHandle: 'empireofthekop',
  },
  {
    journalist: 'This Is Anfield',
    outlet: 'This Is Anfield',
    rssUrl: 'https://www.thisisanfield.com/feed/',
    twitterHandle: 'thisisanfield',
  },
  {
    journalist: 'Anfield Index',
    outlet: 'Anfield Index',
    rssUrl: 'https://anfieldindex.com/feed',
    twitterHandle: 'AnfieldIndex',
  },
];

const PRIMARY_KEYWORDS = [
  "Liverpool",
  "LFC",
  "Anfield",
  "Arne Slot",
  "the Reds",
];

const TRANSFER_KEYWORDS = ["transfer", "signing", "bid", "deal", "window", "fee", "contract", "sign", "linked", "target", "move", "million"];
const INJURY_KEYWORDS = [
  "injured", "injury", "out for", "sidelined", "fitness concern",
  "fitness doubt", "scan", "medical", "muscle", "hamstring", "knee injury",
  "ankle injury", "fracture", "surgery", "rehabilitation", "rehab",
  "ruled out", "race against time", "treatment room", "physio",
  "expected return", "weeks out", "months out",
];
const MATCH_KEYWORDS = ["match report", "player ratings", "post match", "full time", "final whistle", "after the game", "reaction", "win over", "loss to", "defeat to", "victory over", "draw with", "goals", "scored", "equaliser", "penalty", "red card", "result", "goal", "win", "loss", "draw", "preview"];
const OPINION_KEYWORDS = ["verdict", "opinion", "column", "mailbag", "my take", "i think", "we need", "why liverpool", "why arne", "why slot", "must ", "should ", "hard truth", "brutal truth", "honest truth", "unpopular", "concern", "concerns", "worry", "worrying", "damning", "case for", "case against", "time to", "enough is enough", "wake up", "reality check", "talking point", "the truth about", "what liverpool", "what slot"];

type ArticleType = "news" | "transfers" | "injuries" | "opinion" | "match-reaction";

type CrawledItem = {
  title: string;
  content: string;
  link: string;
  pubDate: string;
  imageUrl: string | null;
};

function extractImageFromFeedItem(item: any): string | null {
  try {
    if (item.enclosure?.url && item.enclosure.url.match(/\.(jpg|jpeg|png|webp)/i)) {
      return item.enclosure.url;
    }
    if (item['media:content']?.['$']?.url) {
      return item['media:content']['$'].url;
    }
    if (item['media:thumbnail']?.['$']?.url) {
      return item['media:thumbnail']['$'].url;
    }
    if (item.content) {
      const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) return imgMatch[1];
    }
    if (item.contentSnippet) {
      const imgMatch = item.contentSnippet.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp)/i);
      if (imgMatch) return imgMatch[0];
    }
    return null;
  } catch {
    return null;
  }
}

type Source = (typeof SOURCES)[number];

export async function crawlRSSFeed(source: Source): Promise<CrawledItem[]> {
  try {
    const feed = await parser.parseURL(source.rssUrl);

    const items = (feed.items ?? [])
      .slice(0, 10)
      .filter((item) => {
        const isLiverpoolRelated = PRIMARY_KEYWORDS.some((kw) =>
          item.title?.toLowerCase().includes(kw.toLowerCase()) ||
          item.contentSnippet?.toLowerCase().includes(kw.toLowerCase()) ||
          item.content?.toLowerCase().includes(kw.toLowerCase())
        );
        if (!isLiverpoolRelated) {
          console.log(`[Crawler] Skipping non-Liverpool article: ${item.title}`);
        }
        return isLiverpoolRelated;
      })
      .slice(0, 3)
      .map((item) => ({
        title: item.title ?? "",
        content: item.contentSnippet ?? item.content ?? item.summary ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
        imageUrl: extractImageFromFeedItem(item),
      }));

    return items;
  } catch (error) {
    console.error(`[Crawler] Failed to fetch RSS for ${source.journalist}:`, error);
    return [];
  }
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url.trim())
    return `${u.hostname}${u.pathname}`.toLowerCase().replace(/\/$/, '')
  } catch {
    return url.trim().toLowerCase()
  }
}

export async function isArticleAlreadyCrawled(url: string, _title: string): Promise<boolean> {
  try {
    // Exact URL match
    const { data: exactMatch } = await supabase
      .from('articles')
      .select('id, source_url')
      .limit(200)
      .order('created_at', { ascending: false })

    if (!exactMatch) return false

    const normalizedUrl = normalizeUrl(url)
    const found = exactMatch.some(article =>
      normalizeUrl(article.source_url) === normalizedUrl
    )

    return found
  } catch {
    return false
  }
}

function detectArticleType(title: string, content: string = ""): ArticleType {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  const fullText = `${titleLower} ${contentLower}`;

  const isInjury = INJURY_KEYWORDS.some((kw) => fullText.includes(kw));
  const isTransfer = TRANSFER_KEYWORDS.some((kw) => fullText.includes(kw));
  const isMatchReaction = MATCH_KEYWORDS.some((kw) => fullText.includes(kw));

  const isOpinion = OPINION_KEYWORDS.some((kw) => titleLower.includes(kw));

  if (isInjury) return "injuries";
  if (isTransfer) return "transfers";
  if (isMatchReaction) return "match-reaction";
  if (isOpinion) return "opinion";
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

      const alreadyCrawled = await isArticleAlreadyCrawled(item.link, item.title);
      if (alreadyCrawled) {
        console.log(`[Crawler] Skipping (already crawled): "${item.title}"`);
        continue;
      }

      newArticlesFound++;
      console.log(`[Crawler] New article found: "${item.title}"`);

      const articleType = detectArticleType(item.title, item.content);
      console.log(`[Crawler] Detected type: ${articleType} — Generating article...`);

      try {
        await generateArticle({
          sourceHeadline: item.title,
          sourceContent: item.content,
          sourceJournalist: source.journalist,
          sourceOutlet: source.outlet,
          sourceUrl: item.link,
          articleType,
          isFeatured: false,
          originalImageUrl: item.imageUrl,
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
