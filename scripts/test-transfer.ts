import { generateArticle } from '../lib/andy'

async function testTransfers() {
  const transferStories = [
    {
      sourceHeadline: 'Liverpool target midfielder as Slot eyes summer reinforcements',
      sourceContent: 'Liverpool are monitoring several midfield targets ahead of the summer transfer window. Arne Slot wants to add quality and depth to his squad after a demanding season. The club have identified targets in the Bundesliga and Serie A with a budget of around 80 million pounds available for new signings.',
      sourceJournalist: 'James Pearce',
      sourceOutlet: 'The Athletic',
      sourceUrl: 'https://theathletic.com/placeholder-transfer-1',
      articleType: 'transfers' as const,
      isFeatured: true
    },
    {
      sourceHeadline: 'Liverpool in advanced talks to sign winger as Salah replacement plan takes shape',
      sourceContent: 'Liverpool have held positive talks over a deal for a top European winger as the club prepares for life after Mohamed Salah. The Egyptian King is in the final year of his contract and has attracted interest from Saudi Arabia. Liverpool are determined to have his replacement ready before next season begins.',
      sourceJournalist: 'Paul Joyce',
      sourceOutlet: 'The Times',
      sourceUrl: 'https://thetimes.co.uk/placeholder-transfer-2',
      articleType: 'transfers' as const,
      isFeatured: false
    },
    {
      sourceHeadline: 'Liverpool defender linked with summer exit as contract talks stall',
      sourceContent: 'One of Liverpool\'s key defenders is being linked with a move away from Anfield this summer after contract renewal talks hit a stumbling block. Several top European clubs are monitoring the situation closely. Liverpool are keen to keep the player but have not yet reached an agreement on new terms.',
      sourceJournalist: 'Ian Doyle',
      sourceOutlet: 'Liverpool Echo',
      sourceUrl: 'https://liverpoolecho.co.uk/placeholder-transfer-3',
      articleType: 'transfers' as const,
      isFeatured: false
    }
  ]

  for (const story of transferStories) {
    console.log(`Generating: ${story.sourceHeadline}`)
    await generateArticle(story)
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  console.log('Transfer articles generated successfully')
}

testTransfers()
