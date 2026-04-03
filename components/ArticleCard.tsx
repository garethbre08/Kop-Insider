"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { timeAgo, formatCategory } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

type ArticleCardProps = {
  article: Article | null;
  size?: "hero" | "medium" | "small";
  delay?: number;
};

function SkeletonCard({ size }: { size: "hero" | "medium" | "small" }) {
  const imageHeight =
    size === "hero" ? "h-64 sm:h-80" : size === "medium" ? "h-48" : "h-32";
  return (
    <div className="bg-ki-white rounded-xl overflow-hidden flex flex-col animate-pulse">
      <div className={`${imageHeight} bg-ki-sand`} />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-20 bg-ki-sand rounded" />
        <div className="h-5 bg-ki-sand rounded w-full" />
        {size !== "small" && <div className="h-4 bg-ki-sand rounded w-3/4" />}
        <div className="h-3 w-28 bg-ki-sand rounded mt-2" />
      </div>
    </div>
  );
}

export default function ArticleCard({
  article,
  size = "small",
  delay = 0,
}: ArticleCardProps) {
  const { theme } = useTheme();
  const isHome = theme === "home";
  const tagText = isHome ? "text-ki-red" : "text-ki-teal";

  if (!article) return <SkeletonCard size={size} />;

  const imageHeight =
    size === "hero" ? "h-64 sm:h-80" : size === "medium" ? "h-48" : "h-32";
  const headlineSize =
    size === "hero"
      ? "text-xl sm:text-2xl font-bold"
      : size === "medium"
      ? "text-lg font-bold"
      : "text-base font-bold";

  return (
    <Link href={`/article/${article.id}`} className="block group">
      <article
        className={`bg-ki-white rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in-up h-full${size === "hero" ? " min-h-96" : ""}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="overflow-hidden">
          <div
            role="img"
            aria-label={`Image for article: ${article.title}`}
            className={`w-full bg-ki-sand flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${imageHeight}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-ki-charcoal opacity-30"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 20.25h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12.75c0 .828.672 1.5 1.5 1.5z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 flex-1">
          <span
            className={`inline-block bg-ki-sand text-xs font-semibold rounded px-2 py-1 self-start uppercase tracking-wide ${tagText}`}
          >
            {formatCategory(article.category)}
          </span>

          <h2 className={`text-ki-black leading-snug ${headlineSize}`}>
            {article.title}
          </h2>

          {size === "hero" && (
            <p className="text-ki-charcoal text-sm opacity-70 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {size === "medium" && (
            <p className="text-ki-charcoal text-sm opacity-70 line-clamp-2">
              {article.excerpt}
            </p>
          )}

          <p className="text-ki-charcoal text-xs opacity-50 mt-auto pt-1">
            Andy Anfield · {timeAgo(article.created_at)}
          </p>
        </div>
      </article>
    </Link>
  );
}
