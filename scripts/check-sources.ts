import { crawlRSSFeed } from '../lib/crawler'

const SOURCES = [
  { journalist: 'Ian Doyle', outlet: 'Liverpool Echo', rssUrl: 'https://www.liverpoolecho.co.uk/sport/football/football-news/?service=rss', twitterHandle: 'IanDoyleSport' },
  { journalist: 'Sky Sports', outlet: 'Sky Sports', rssUrl: 'https://www.skysports.com/rss/12040', twitterHandle: 'SkySportsLFC' },
  { journalist: 'BBC Sport', outlet: 'BBC Sport', rssUrl: 'https://feeds.bbci.co.uk/sport/football/teams/liverpool/rss.xml', twitterHandle: 'BBCSport' },
  { journalist: 'Dominic King', outlet: 'Daily Mail', rssUrl: 'https://www.dailymail.co.uk/sport/football/index.rss', twitterHandle: 'DominicKing_DM' },
  { journalist: 'DaveOCKOP', outlet: 'DaveOCKOP.com', rssUrl: 'https://www.daveockop.com/feed/', twitterHandle: 'DaveOCKOP' },
]

async function main() {
  for (const source of SOURCES) {
    try {
      const items = await crawlRSSFeed(source)
      console.log(`✓ ${source.journalist} (${source.outlet}) — ${items.length} Liverpool items`)
    } catch (e: any) {
      console.log(`✗ ${source.journalist} (${source.outlet}) — ERROR: ${e.message}`)
    }
  }
}

main()
