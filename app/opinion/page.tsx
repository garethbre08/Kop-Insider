import type { Metadata } from 'next'
import OpinionContent from './OpinionContent'

export const metadata: Metadata = {
  title: 'Opinion — Andy Anfield',
  description: 'Andy Anfield opinion pieces on Liverpool FC. Passionate, informed and brutal when necessary.',
}
import Sidebar from '@/components/Sidebar'

export default async function OpinionPage() {
  return <OpinionContent sidebar={<Sidebar />} />
}
