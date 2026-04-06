const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

export async function getArticleImage(query: string, seed?: string): Promise<string | null> {
  try {
    const queries = [
      `liverpool football ${query}`,
      `liverpool fc anfield`,
      `premier league football`,
    ]

    for (const searchQuery of queries) {
      const encoded = encodeURIComponent(searchQuery)
      const randomPage = Math.floor(Math.random() * 5) + 1
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encoded}&per_page=10&page=${randomPage}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
          next: { revalidate: 86400 },
        }
      )
      if (!res.ok) continue
      const data = await res.json()
      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length)
        return data.results[randomIndex].urls.regular
      }
    }
    return null
  } catch (error) {
    console.error('Unsplash fetch error:', error)
    return null
  }
}
