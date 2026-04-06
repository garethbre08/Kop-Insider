import type { Metadata } from 'next'
import InjuriesContent from './InjuriesContent'

export const metadata: Metadata = {
  title: 'Injury Updates',
  description: 'Full Liverpool FC injury tracker. Who is out, who is doubtful and when are they coming back?',
}
import Sidebar from '@/components/Sidebar'

export default async function InjuriesPage() {
  return <InjuriesContent sidebar={<Sidebar />} />
}
