import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { selectArticleImage } from '../lib/imageUtils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

// Mirror the subject/context lists from imageUtils so we can infer which step succeeded
const SUBJECT_NAMES = [
  'fenway sports group', 'xabi alonso', 'steven gerrard', 'jurgen klopp', 'arne slot',
  'john henry', 'tom werner', 'michael edwards', 'richard hughes', 'billy hogan',
  'harvey elliott', 'van dijk', 'mac allister', 'mac-allister', 'macallister',
  'alisson', 'bradley', 'chiesa', 'ekitiké', 'ekitike', 'endo', 'frimpong',
  'gakpo', 'gomez', 'gravenberch', 'isak', 'jones', 'jota', 'kerkez',
  'konaté', 'konate', 'leoni', 'mamardashvili', 'ndiaye', 'ngumoha',
  'robertson', 'salah', 'szoboszlai', 'wirtz', 'woodman', 'wright',
  'slot', 'gerrard', 'alonso', 'klopp',
  'fenway', 'fsg', 'henry', 'werner', 'edwards', 'hughes', 'hogan',
  'harvey', 'elliott',
]

const CONTEXT_KEYWORDS = [
  'injury', 'injured', 'transfer', 'signing', 'contract', 'goal',
  'debut', 'return', 'ban', 'sale', 'bid', 'deal', 'farewell',
  'tribute', 'memorial', 'hillsborough',
]

function hasSubject(text: string): boolean {
  const lower = text.toLowerCase()
  return SUBJECT_NAMES.some(n => lower.includes(n.toLowerCase()))
}

function hasContext(text: string): boolean {
  const lower = text.toLowerCase()
  return CONTEXT_KEYWORDS.some(k => lower.includes(k))
}

function libraryIsPopulated(): boolean {
  if (!fs.existsSync(IMAGES_DIR)) return false
  try {
    return fs.readdirSync(IMAGES_DIR).some(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  } catch {
    return false
  }
}

function inferLibraryStep(image: string, title: string, contentSnippet: string): 'library-context' | 'library-generic' {
  const subjectInTitle = hasSubject(title)
  const contextInTitle = hasContext(title)
  const subjectInContent = hasSubject(contentSnippet)
  const contextInContent = hasContext(contentSnippet)

  if ((subjectInTitle && contextInTitle) || (subjectInContent && contextInContent)) {
    return 'library-context'
  }
  return 'library-generic'
}

type Source = 'original' | 'library-context' | 'library-generic' | 'fallback' | 'none'

function pad(s: string, n: number): string {
  return s.padEnd(n)
}

async function backfillImages() {
  console.log('=== Kop Insider Image Backfill ===\n')

  const libraryPopulated = libraryIsPopulated()
  console.log(`Library images present: ${libraryPopulated}\n`)

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, category, content, image_url')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch articles:', error)
    process.exit(1)
  }

  if (!articles || articles.length === 0) {
    console.log('No articles found.')
    return
  }

  console.log(`Processing ${articles.length} articles...\n`)

  const tally: Record<Source, number> = {
    original: 0,
    'library-context': 0,
    'library-generic': 0,
    fallback: 0,
    none: 0,
  }

  for (const article of articles) {
    const title = article.title ?? '(no title)'
    const content = article.content ?? ''
    const contentSnippet = content.slice(0, 500)

    // Step 1 — keep existing external image (original from RSS scrape)
    if (article.image_url && article.image_url.startsWith('http')) {
      console.log(`[${pad('original', 15)}] ${title}`)
      console.log(`                   → ${article.image_url}\n`)
      tally.original++
      continue
    }

    // Steps 2–4 — library (context match → generic → fallback)
    const image = await selectArticleImage(title, content, article.category, article.id)

    let source: Source = 'none'
    if (image) {
      const FALLBACK_IMAGES = ['liverpool-team', 'anfield']
      const isFallback = FALLBACK_IMAGES.some(k => image.includes(k))
      if (isFallback) {
        source = 'fallback'
      } else {
        source = inferLibraryStep(image, title, contentSnippet)
      }

      const { error: updateError } = await supabase
        .from('articles')
        .update({ image_url: image })
        .eq('id', article.id)

      if (updateError) {
        console.error(`  ✗ DB update failed for: ${title}`, updateError)
      } else {
        console.log(`[${pad(source, 15)}] ${title}`)
        console.log(`                   → ${image}\n`)
        tally[source]++
      }
    } else {
      console.log(`[${pad('none', 15)}] ${title} — no image found\n`)
      tally.none++
    }

    await new Promise(r => setTimeout(r, 1000))
  }

  console.log('=== Summary ===')
  console.log(`  original:        ${tally.original}`)
  console.log(`  library-context: ${tally['library-context']}`)
  console.log(`  library-generic: ${tally['library-generic']}`)
  console.log(`  fallback:        ${tally.fallback}`)
  console.log(`  none:            ${tally.none}`)
  console.log(`  total:           ${articles.length}`)
}

backfillImages()
