import { MetadataRoute } from 'next'
import { getLatestArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getLatestArticles(50)

  const articleUrls = articles.map((article) => ({
    url: `https://kopinsider.com/article/${article.id}`,
    lastModified: new Date(article.created_at),
    changeFrequency: 'never' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://kopinsider.com',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: 'https://kopinsider.com/match-centre',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://kopinsider.com/transfer-talk',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://kopinsider.com/injuries',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://kopinsider.com/opinion',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://kopinsider.com/author/andy-anfield',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...articleUrls,
  ]
}
