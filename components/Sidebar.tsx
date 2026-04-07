import { getPremierLeagueTable, getAllLiverpoolFixtures } from '@/lib/football'
import SidebarClient from './SidebarClient'

export default async function Sidebar() {
  const tableData = await getPremierLeagueTable()
  const fixtures = await getAllLiverpoolFixtures()
  return <SidebarClient tableData={tableData} fixtures={fixtures} />
}
