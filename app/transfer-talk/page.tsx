import type { Metadata } from 'next'
import TransferTalkContent from './TransferTalkContent'

export const metadata: Metadata = {
  title: 'Transfer Talk',
  description: 'The latest Liverpool FC transfer news, rumours and analysis. Who is coming to Anfield and who is leaving?',
}
import Sidebar from '@/components/Sidebar'

export default async function TransferTalkPage() {
  return <TransferTalkContent sidebar={<Sidebar />} />
}
