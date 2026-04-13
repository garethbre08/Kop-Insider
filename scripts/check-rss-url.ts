import RSSParser from 'rss-parser'

const parser = new RSSParser()

async function main() {
  const feed = await parser.parseURL('https://www.skysports.com/rss/12040')
  feed.items?.slice(0, 5).forEach(item => {
    console.log('URL:', item.link)
    console.log('Title:', item.title)
    console.log('---')
  })
}

main()
