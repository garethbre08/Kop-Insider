export async function getSmartImageQuery(title: string, content: string, category: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `You are helping find the most relevant stock photo for a Liverpool FC news article.

Article title: ${title}
Article category: ${category}
Article content: ${content.slice(0, 500)}

Based on the article content suggest the single best Unsplash search query to find a relevant image.
The query should be specific to what the article is actually about.
Rules:
- If about a specific player mention their position and action eg "footballer celebrating goal"
- If about an injury use "football player injury medical treatment"
- If about a transfer use "footballer signing contract"
- If about a match use "liverpool fc match stadium fans"
- If about tactics use "football manager tactics board"
- Always include football related terms
- Maximum 5 words
- Return ONLY the search query, nothing else`
        }]
      })
    })

    const data = await response.json()
    const query = data.content[0]?.text?.trim() || `liverpool fc ${category}`
    console.log(`[Andy Anfield] Smart image query for "${title}": ${query}`)
    return query
  } catch (error) {
    console.error('Smart query error:', error)
    return `liverpool fc ${category}`
  }
}

export async function getArticleImage(query: string, seed?: string): Promise<string | null> {
  try {
    const queries = [
      `liverpool fc ${query}`,
      `liverpool fc anfield stadium`,
      `liverpool fc players anfield`,
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
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
          },
          next: { revalidate: 86400 }
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
