const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

export async function getArticleImage(query: string): Promise<string | null> {
  try {
    const searchQuery = encodeURIComponent(`liverpool football ${query}`)
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.results || data.results.length === 0) return null
    return data.results[0].urls.regular
  } catch (error) {
    console.error('Unsplash fetch error:', error)
    return null
  }
}

export async function getArticleImages(articles: any[]): Promise<Record<string, string>> {
  const imageMap: Record<string, string> = {}

  await Promise.all(
    articles.map(async (article) => {
      if (article.image_url) {
        imageMap[article.id] = article.image_url
        return
      }
      const keywords = `${article.category} ${article.title.split(' ').slice(0, 3).join(' ')}`
      const image = await getArticleImage(keywords)
      if (image) {
        imageMap[article.id] = image
      }
    })
  )

  return imageMap
}
