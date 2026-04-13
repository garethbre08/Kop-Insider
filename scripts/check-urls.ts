import { supabase } from '../lib/supabase'

async function main() {
  // Count all articles
  const { count } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })

  console.log(`Total articles in DB: ${count}`)

  // Show all with URLs
  const { data } = await supabase
    .from('articles')
    .select('title, source_url, created_at')
    .order('created_at', { ascending: false })

  data?.forEach(a => {
    console.log(`\n[${a.created_at?.slice(0, 19)}] ${a.title?.slice(0, 55)}`)
    console.log(`  ${a.source_url}`)
  })
}

main()
