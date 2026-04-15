import { createClient } from '@supabase/supabase-js'
import { getPlayerImageFromText } from '../lib/playerImages'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function run() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, content, image_url')
    .or('title.ilike.%ekitike%,title.ilike.%ekitiké%')

  if (!articles || articles.length === 0) {
    console.log('No Ekitike articles found')
    return
  }

  for (const article of articles) {
    console.log(`Found: ${article.title}`)
    console.log(`  Current image: ${article.image_url}`)

    const correctImage = getPlayerImageFromText(article.title, article.content || '')
    console.log(`  Correct image: ${correctImage}`)

    if (correctImage && correctImage !== article.image_url) {
      const { error } = await supabase
        .from('articles')
        .update({ image_url: correctImage })
        .eq('id', article.id)

      if (error) {
        console.error(`  Failed to update:`, error.message)
      } else {
        console.log(`  Updated successfully`)
      }
    } else {
      console.log(`  No update needed`)
    }
  }
}

run()
