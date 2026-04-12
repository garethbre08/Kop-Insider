import type { Metadata } from 'next'
import { getLatestArticles, getFeaturedArticle, getOpinionArticles } from '@/lib/articles'
import { getPremierLeagueTable, getAllLiverpoolFixtures, getLiverpoolLiveScore } from '@/lib/football'
import Sidebar from '@/components/Sidebar'
import HomePageContent from '@/components/HomePageContent'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Liverpool FC breaking news, transfer talk, injury updates and Andy Anfield opinion pieces. Updated automatically every 30 minutes.',
}

export default async function Home() {
  const [featuredArticle, opinionArticles, allLatest, tableData, fixtures, liveScore] = await Promise.all([
    getFeaturedArticle(),
    getOpinionArticles(1),
    getLatestArticles(12),
    getPremierLeagueTable(),
    getAllLiverpoolFixtures(),
    getLiverpoolLiveScore(),
  ])
  const opinionArticle = opinionArticles[0] || null

  const usedIds = [featuredArticle?.id, opinionArticle?.id].filter(Boolean)
  const latestArticles = allLatest.filter(article => !usedIds.includes(article.id)).slice(0, 12)

  return (
    <HomePageContent
      featuredArticle={featuredArticle}
      latestArticles={latestArticles}
      opinionArticle={opinionArticle}
      tableData={tableData}
      fixtures={fixtures}
      liveScore={liveScore}
      sidebar={<Sidebar />}
    />
  )
}
