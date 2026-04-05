import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getArticleImage(query: string): Promise<string | null> {
  try {
    const searchQuery = encodeURIComponent(`${query} football liverpool`)
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
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

async function backfillImages() {
  console.log('Fetching articles without images...')
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, image_url')
    .is('image_url', null)

  if (!articles || articles.length === 0) {
    console.log('All articles already have images')
    return
  }

  console.log(`Found ${articles.length} articles without images`)

  for (const article of articles) {
    const keywords = article.title.split(' ').slice(0, 4).join(' ')
    const image = await getArticleImage(keywords)
    if (image) {
      await supabase
        .from('articles')
        .update({ image_url: image })
        .eq('id', article.id)
      console.log(`Image added for: ${article.title}`)
    } else {
      console.log(`No image found for: ${article.title}`)
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('Backfill complete')
}

backfillImages()
