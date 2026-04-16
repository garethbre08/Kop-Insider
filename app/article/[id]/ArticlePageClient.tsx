"use client";

import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { timeAgo } from "@/lib/utils";
import type { Article } from "@/lib/database.types";

type Props = {
  article: Article;
  related: Article[];
};

export default function ArticlePageClient({ article, related }: Props) {
  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main style={{ backgroundColor: '#F3EEDD', minHeight: '100vh' }}>

      {/* BACK LINK */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px 0', fontFamily: 'var(--font-body)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--ki-accent)', fontSize: '13px', fontWeight: 600 }}>
          ← Back to Kop Insider
        </Link>
      </div>

      {/* ARTICLE HEADER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', borderLeft: '4px solid var(--ki-accent)', marginBottom: '24px' }}>
          <div className="article-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

            {/* LEFT — Title and meta */}
            <div>
              <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                {article.category}
              </span>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: '16px' }}>
                {article.title}
              </h1>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#333', opacity: 0.7, lineHeight: 1.6, marginBottom: '20px' }}>
                {article.excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #E7DFC9' }}>
                <Link href="/author/andy-anfield" style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <img src="/andy.jpg" alt="Andy Anfield" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
                </Link>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', fontFamily: 'var(--font-body)' }}>Andy Anfield</div>
                  <div suppressHydrationWarning style={{ fontSize: '11px', color: '#333', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
                    Kop Insider Reporter · {timeAgo(article.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Featured image */}
            <div className="article-featured-image" style={{ borderRadius: '10px', overflow: 'hidden', height: '220px', flexShrink: 0 }}>
              {article.image_url && article.image_url.length > 0 ? (
                <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#01586B', opacity: 0.2, fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>KOP INSIDER</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT + SIDEBAR */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* ARTICLE BODY */}
          <div>
            <div className="article-body" style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', marginBottom: '16px' }}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#333', lineHeight: 1.8, marginBottom: index < paragraphs.length - 1 ? '20px' : '0' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* SHARE BUTTONS */}
            <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#333', opacity: 0.5, marginBottom: '12px', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Share this article
              </div>
              <ShareButtons title={article.title} url={`https://kopinsider.com/article/${article.id}`} />
            </div>

            {/* SOURCE CREDIT */}
            <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', borderLeft: '4px solid var(--ki-accent)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                Source and Credits
              </div>
              <p style={{ fontSize: '13px', color: '#333', opacity: 0.65, lineHeight: 1.6, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                This article was written by Andy Anfield, Kop Insider AI Reporter, informed by reporting from <strong>{article.source_journalist}</strong> at {article.source_outlet}.
              </p>
              <a href={article.source_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ki-accent)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                Read the original report →
              </a>
              <p style={{ fontSize: '11px', color: '#333', opacity: 0.4, marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                Kop Insider always credits original journalism. We report independently — facts inform us, words are our own.
              </p>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>

            {/* MORE FROM ANDY */}
            <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E7DFC9', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '3px', height: '16px', backgroundColor: 'var(--ki-accent)', borderRadius: '2px' }} />
                More from Andy
              </div>
              <div>
                {related.map((a) => (
                  <Link key={a.id} href={`/article/${a.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}>
                    <div style={{ backgroundColor: '#FDFCFA', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
                      <div style={{ width: '100%', height: '140px', overflow: 'hidden' }}>
                        {a.image_url && a.image_url.length > 0 ? (
                          <img src={a.image_url} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ backgroundColor: '#E7DFC9', width: '100%', height: '100%' }} />
                        )}
                      </div>
                      <div style={{ padding: '12px' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#333333', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                          {a.category}
                        </span>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                          {a.title}
                        </div>
                        <div suppressHydrationWarning style={{ fontSize: '11px', color: '#333', opacity: 0.45, fontFamily: 'var(--font-body)' }}>
                          Andy Anfield · {timeAgo(a.created_at)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .article-grid {
            grid-template-columns: 1fr !important;
          }
          .article-body {
            padding: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .article-header-grid {
            grid-template-columns: 1fr !important;
          }
          .article-featured-image {
            height: 200px !important;
            order: -1 !important;
          }
        }
      `}</style>

    </main>
  );
}
