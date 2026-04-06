import type { Metadata } from "next";
import Link from "next/link";
import { getArticleById, getLatestArticles } from "@/lib/articles";
import ArticlePageClient from "./ArticlePageClient";
import Sidebar from "@/components/Sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      authors: ['Andy Anfield'],
      images: article.image_url
        ? [{ url: article.image_url, width: 1200, height: 630, alt: article.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, latest] = await Promise.all([
    getArticleById(id),
    getLatestArticles(4),
  ]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-ki-black font-bold text-2xl">Article not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ki-teal text-sm font-semibold hover:opacity-70 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Kop Insider
        </Link>
      </div>
    );
  }

  const related = latest.filter((a) => a.id !== id).slice(0, 3);

  return <ArticlePageClient article={article} related={related} sidebar={<Sidebar />} />;
}
