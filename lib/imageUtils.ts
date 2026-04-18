import fs from 'fs'
import path from 'path'

const STATE_FILE = path.join(process.cwd(), 'lib', 'imageLoopState.json')
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

// Names to check against article text — multi-word first so they match before substrings
const SUBJECT_NAMES = [
  'fenway sports group', 'xabi alonso', 'steven gerrard', 'jurgen klopp', 'arne slot',
  'john henry', 'tom werner', 'michael edwards', 'richard hughes', 'billy hogan',
  'harvey elliott', 'van dijk', 'mac allister', 'mac-allister', 'macallister',
  'jamie carragher', 'thiago alcantara',
  'alisson', 'bradley', 'carragher', 'chiesa', 'ekitiké', 'ekitike', 'endo', 'frimpong',
  'tsimikas', 'kostas tsimikas',
  'anthony gordon', 'gakpo', 'gomez', 'gordon', 'gravenberch', 'hillsborough', 'isak', 'jones', 'jota', 'kerkez',
  'konaté', 'konate', 'leoni', 'mamardashvili', 'ndiaye', 'ngumoha', 'pimblett', 'quansah',
  'robertson', 'salah', 'szoboszlai', 'thiago', 'wirtz', 'woodman', 'wright',
  'slot', 'gerrard', 'alonso', 'klopp',
  'fenway', 'fsg', 'henry', 'werner', 'edwards', 'hughes', 'hogan',
  'harvey', 'elliott',
]

// Maps subject name strings to the file key they should resolve to
const NAME_TO_KEY: Record<string, string> = {
  'harvey elliott': 'elliott',
  'harvey': 'elliott',
  'arne slot': 'slot',
  'steven gerrard': 'gerrard',
  'jurgen klopp': 'klopp',
  'xabi alonso': 'alonso',
  'john henry': 'henry',
  'tom werner': 'werner',
  'michael edwards': 'edwards',
  'richard hughes': 'hughes',
  'billy hogan': 'hogan',
  'fenway sports group': 'fsg',
  'fenway': 'fsg',
  'macallister': 'mac-allister',
  'mac allister': 'mac-allister',
  'mac-allister': 'mac-allister',
  'ekitiké': 'ekitike',
  'konaté': 'konate',
  'jamie carragher': 'carragher',
  'thiago alcantara': 'thiago',
  'kostas tsimikas': 'tsimikas',
  'anthony gordon': 'gordon',
}

const CONTEXT_KEYWORDS = [
  'injury', 'injured', 'transfer', 'signing', 'contract', 'goal',
  'debut', 'return', 'ban', 'sale', 'bid', 'deal', 'farewell',
  'tribute', 'memorial',
]

// Normalise a string to a filename-safe key
function normaliseKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// --- State file ---

function readState(): Record<string, number> {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch {}
  return {}
}

function writeState(state: Record<string, number>): void {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  } catch (err) {
    console.error('[ImageUtils] Could not write loop state:', err)
  }
}

// --- Image library ---

// Returns Record<key, sorted array of public paths>
// Files named `salah-1.jpg`, `salah-2.jpg` → key "salah" → ["/images/salah-1.jpg", ...]
// Files named `salah.jpg` (no number) → key "salah" → ["/images/salah.jpg"]
function scanImageLibrary(): Record<string, string[]> {
  const result: Record<string, string[]> = {}

  if (!fs.existsSync(IMAGES_DIR)) return result
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
  } catch { return result }

  for (const entry of entries) {
    if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const basename = entry.name.replace(/\.(jpg|jpeg|png|webp)$/i, '')
      const numbered = basename.match(/^(.+)-(\d+)$/)
      const rawKey = numbered ? numbered[1] : basename
      const key = normaliseKey(rawKey)
      const fullPath = `/images/${entry.name}`
      if (!result[key]) result[key] = []
      result[key].push(fullPath)
    }
  }

  for (const key in result) {
    result[key].sort()
  }

  return result
}

function getNextImageForKey(key: string, library: Record<string, string[]>): string | null {
  const images = library[key]
  if (!images || images.length === 0) return null

  const state = readState()
  const lastUsed = state[key] || 0
  const nextPos = lastUsed % images.length
  const chosen = images[nextPos]

  state[key] = lastUsed + 1
  writeState(state)

  return chosen
}

// --- Keyword extraction ---

function extractSubjectKey(text: string): string | null {
  const lower = text.toLowerCase()
  for (const name of SUBJECT_NAMES) {
    if (lower.includes(name.toLowerCase())) {
      return NAME_TO_KEY[name] ?? normaliseKey(name)
    }
  }
  return null
}

function extractContext(text: string): string | null {
  const lower = text.toLowerCase()
  for (const ctx of CONTEXT_KEYWORDS) {
    if (lower.includes(ctx)) return ctx
  }
  return null
}

// --- Main export ---

export async function selectArticleImage(
  title: string,
  content: string,
  category: string,
  articleId: string
): Promise<string | null> {
  const library = scanImageLibrary()
  const titleLower = title.toLowerCase()
  const contentSnippet = content.slice(0, 500).toLowerCase()

  // Step 2 — context-matched library image (subject + context keyword in title, then content)
  const subjectFromTitle = extractSubjectKey(titleLower)
  const contextFromTitle = extractContext(titleLower)

  if (subjectFromTitle && contextFromTitle) {
    const compoundKey = `${subjectFromTitle}-${contextFromTitle}`
    const image = getNextImageForKey(compoundKey, library)
    if (image) {
      console.log(`[ImageUtils] Context match: ${image} (${compoundKey})`)
      return image
    }
  }

  // Also try subject from content if not found in title
  const subjectFromContent = subjectFromTitle ?? extractSubjectKey(contentSnippet)
  const contextFromContent = contextFromTitle ?? extractContext(contentSnippet)

  if (subjectFromContent && contextFromContent && subjectFromContent !== subjectFromTitle) {
    const compoundKey = `${subjectFromContent}-${contextFromContent}`
    const image = getNextImageForKey(compoundKey, library)
    if (image) {
      console.log(`[ImageUtils] Context match (content): ${image} (${compoundKey})`)
      return image
    }
  }

  // Step 3 — generic subject match
  if (subjectFromTitle) {
    const image = getNextImageForKey(subjectFromTitle, library)
    if (image) {
      console.log(`[ImageUtils] Subject match: ${image} (${subjectFromTitle})`)
      return image
    }
  }

  if (subjectFromContent && subjectFromContent !== subjectFromTitle) {
    const image = getNextImageForKey(subjectFromContent, library)
    if (image) {
      console.log(`[ImageUtils] Subject match (content): ${image} (${subjectFromContent})`)
      return image
    }
  }

  // Step 4 — fallback to liverpool-team or anfield images
  const FALLBACK_KEYS = ['liverpool-team', 'anfield']
  for (const key of FALLBACK_KEYS) {
    const image = getNextImageForKey(key, library)
    if (image) {
      console.log(`[ImageUtils] Fallback: ${image}`)
      return image
    }
  }

  console.log(`[ImageUtils] No image found for: "${title}"`)
  return null
}
