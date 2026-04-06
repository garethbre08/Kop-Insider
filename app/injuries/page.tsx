import InjuriesContent from './InjuriesContent'
import Sidebar from '@/components/Sidebar'

export default async function InjuriesPage() {
  return <InjuriesContent sidebar={<Sidebar />} />
}
