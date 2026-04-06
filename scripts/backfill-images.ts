import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

async function getImage(query: string): Promise<string | null> {
  const queries = [
    `liverpool football ${query}`,
    `liverpool fc anfield`,
    `premier league football`,
  ]

  for (const searchQuery of queries) {
    const encoded = encodeURIComponent(searchQuery)
    const randomPage = Math.floor(Math.random() * 3) + 1
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encoded}&per_page=10&page=${randomPage}&orientation=landscape`,
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
      const randomIndex = Math.floor(Math.random() * data.results.length)
      return data.results[randomIndex].urls.regular
    }
  }
  return null
}

async function backfillImages() {
  console.log('Fetching all articles...')

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, category, image_url')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  if (!articles || articles.length === 0) {
    console.log('No articles found')
    return
  }

  console.log(`Found ${articles.length} total articles`)
  const needsImage = articles.filter(a => !a.image_url)
  console.log(`${needsImage.length} articles need images`)

  for (const article of needsImage) {
    console.log(`Processing: ${article.title}`)
    const keywords = `${article.category} ${article.title.split(' ').slice(0, 3).join(' ')}`
    const image = await getImage(keywords)

    if (image) {
      const { error: updateError } = await supabase
        .from('articles')
        .update({ image_url: image })
        .eq('id', article.id)

      if (updateError) {
        console.error(`Failed to save image for ${article.title}:`, updateError)
      } else {
        console.log(`✓ Image saved for: ${article.title}`)
      }
    } else {
      console.log(`✗ No image found for: ${article.title}`)
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
