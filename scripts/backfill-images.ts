import { createClient } from '@supabase/supabase-js'
import { getSmartImageQuery, getArticleImage } from '../lib/images'
import { getPlayerImageFromText, getRandomPlayerImage } from '../lib/playerImages'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

async function getImage(query: string, seed?: string): Promise<string | null> {
  const queries = [
    `liverpool football ${query}`,
    `liverpool fc anfield stadium`,
    `premier league football match`,
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
      }
    )
    if (!res.ok) {
      console.log(`Unsplash request failed for: ${searchQuery}`)
      continue
    }
    const data = await res.json()
    if (data.results && data.results.length > 0) {
      const index = seedNumber % data.results.length
      return data.results[index].urls.regular
    }
  }
  return null
}

async function backfillImages() {
  console.log('Fetching all articles...')

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, category, image_url, content')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  if (!articles || articles.length === 0) {
    console.log('No articles found')
    return
  }

  console.log(`Found ${articles.length} total articles`)

  // Find duplicate image URLs
  const imageUrlCounts: Record<string, number> = {}
  articles.forEach(a => {
    if (a.image_url) {
      imageUrlCounts[a.image_url] = (imageUrlCounts[a.image_url] || 0) + 1
    }
  })

  const duplicateUrls = Object.entries(imageUrlCounts)
    .filter(([_, count]) => count > 1)
    .map(([url]) => url)

  console.log(`Found ${duplicateUrls.length} duplicate image URLs`)

  // Reset duplicate images
  for (const article of articles) {
    if (article.image_url && duplicateUrls.includes(article.image_url)) {
      await supabase
        .from('articles')
        .update({ image_url: null })
        .eq('id', article.id)
      console.log(`Reset duplicate image for: ${article.title}`)
    }
  }

  // Refetch images for articles with no image
  const { data: needsImageArticles } = await supabase
    .from('articles')
    .select('id, title, category, image_url, content')

  const needsImage = needsImageArticles?.filter(a => !a.image_url) || []
  console.log(`${needsImage.length} articles need images`)

  for (const article of needsImage) {
    console.log(`Processing: ${article.title}`)

    const smartQuery = await getSmartImageQuery(article.title, article.content || '', article.category)
    const image = await getArticleImage(smartQuery, article.id)

    if (image) {
      const { error } = await supabase.from('articles').update({ image_url: image }).eq('id', article.id)
      if (!error) {
        console.log(`✓ Unsplash image saved for: ${article.title} — query: ${smartQuery}`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        continue
      }
    }

    const playerImage = getPlayerImageFromText(article.title, article.content || '')
    const fallbackImage = playerImage || getRandomPlayerImage()

    const { error } = await supabase.from('articles').update({ image_url: fallbackImage }).eq('id', article.id)
    if (!error) {
      console.log(`✓ Player fallback image used for: ${article.title} — ${fallbackImage}`)
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  console.log('\nVerifying saves...')
  const { data: verified } = await supabase
    .from('articles')
    .select('id, title, image_url')

  const withImages = verified?.filter(a => a.image_url) || []
  const withoutImages = verified?.filter(a => !a.image_url) || []

  console.log(`Articles with images: ${withImages.length}`)
  console.log(`Articles without images: ${withoutImages.length}`)
  withoutImages.forEach(a => console.log(`  Missing: ${a.title}`))
}

backfillImages()
