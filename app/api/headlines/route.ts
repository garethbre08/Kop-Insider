import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) throw error

    const headlines = data?.map(a => a.title) || [
      'Liverpool FC News — Kop Insider',
      'Transfer Talk — Latest from Anfield',
      'Match Reports — Andy Anfield Analysis',
    ]

    return NextResponse.json({ headlines })
  } catch {
    return NextResponse.json({
      headlines: [
        'Liverpool FC News — Kop Insider',
        'Transfer Talk — Latest from Anfield',
        'Match Reports — Andy Anfield Analysis',
      ]
    })
  }
}
