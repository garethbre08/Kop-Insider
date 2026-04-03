import HomeContent from "@/components/HomeContent";
import {
  getFeaturedArticle,
  getLatestArticles,
  getOpinionArticles,
} from "@/lib/articles";
import type { Article } from "@/lib/database.types";

export default async function HomePage() {
  let featuredArticle: Article | null = null;
  let latestArticles: Article[] = [];
  let opinionArticle: Article | null = null;

  try {
    const [featured, latest, opinions] = await Promise.all([
      getFeaturedArticle(),
      getLatestArticles(6),
      getOpinionArticles(1),
    ]);
    featuredArticle = featured;
    latestArticles = latest;
    opinionArticle = opinions[0] ?? null;
  } catch (err) {
    console.error("[Home] Failed to fetch articles:", err);
  }

  return (
    <HomeContent
      featuredArticle={featuredArticle}
      latestArticles={latestArticles}
      opinionArticle={opinionArticle}
    />
  );
}
