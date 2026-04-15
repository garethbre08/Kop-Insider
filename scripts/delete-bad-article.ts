import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function run() {
  const { data, error } = await supabase
    .from('articles')
    .delete()
    .ilike('title', '%source material%')
    .select()

  if (error) { console.error(error); return }
  console.log(`Deleted ${data?.length} article(s)`)
  data?.forEach(a => console.log(' -', a.title))
}

run()
