const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

export async function getArticleImage(query: string, seed?: string): Promise<string | null> {
  try {
    const queries = [
      `liverpool football ${query}`,
      `liverpool fc anfield stadium`,
      `premier league football match`
    ]

    const seedNumber = seed
      ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : Math.floor(Math.random() * 10)

    const page = (seedNumber % 8) + 1

    for (const searchQuery of queries) {
      const encoded = encodeURIComponent(searchQuery)
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encoded}&per_page=10&page=${page}&orientation=landscape`,
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
        const index = seedNumber % data.results.length
        return data.results[index].urls.regular
      }
    }
    return null
  } catch (error) {
    console.error('Unsplash fetch error:', error)
    return null
  }
}
