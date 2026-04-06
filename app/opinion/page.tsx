import OpinionContent from './OpinionContent'
import Sidebar from '@/components/Sidebar'

export default async function OpinionPage() {
  return <OpinionContent sidebar={<Sidebar />} />
}
