import { generateArticle } from '../lib/andy'

async function testInjuries() {
  const injuryStories = [
    {
      sourceHeadline: 'Liverpool handed injury boost ahead of crucial Champions League tie',
      sourceContent: 'Liverpool have received a major boost with several key players returning to training ahead of their Champions League quarter final. Arne Slot confirmed at his press conference that the players have come through training without any setbacks and are in contention to feature. The news will be a huge relief to Liverpool fans after a difficult run of injuries.',
      sourceJournalist: 'James Pearce',
      sourceOutlet: 'The Athletic',
      sourceUrl: 'https://theathletic.com/placeholder-injury-1',
      articleType: 'injuries' as const,
      isFeatured: true
    },
    {
      sourceHeadline: 'Liverpool midfielder faces race against time to be fit for Merseyside derby',
      sourceContent: 'Liverpool are sweating over the fitness of a key midfielder ahead of the Merseyside derby against Everton. The player picked up a knock in training and is being assessed by the medical team. Arne Slot refused to give a definitive timeline on his return but admitted it is touch and go whether he will be available.',
      sourceJournalist: 'Paul Gorst',
      sourceOutlet: 'Liverpool Echo',
      sourceUrl: 'https://liverpoolecho.co.uk/placeholder-injury-2',
      articleType: 'injuries' as const,
      isFeatured: false
    },
    {
      sourceHeadline: 'Liverpool defender set for extended absence after scan reveals extent of injury',
      sourceContent: 'Liverpool have been dealt a blow after scans confirmed that one of their key defenders will be sidelined for an extended period. The player suffered the injury during last weekend\'s Premier League match and subsequent tests have revealed significant damage. The club are now working on their recovery plan with the player expected to miss several weeks of action.',
      sourceJournalist: 'Ian Doyle',
      sourceOutlet: 'Liverpool Echo',
      sourceUrl: 'https://liverpoolecho.co.uk/placeholder-injury-3',
      articleType: 'injuries' as const,
      isFeatured: false
    }
  ]

  for (const story of injuryStories) {
    console.log(`Generating: ${story.sourceHeadline}`)
    await generateArticle(story)
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  console.log('Injury articles generated successfully')
}

testInjuries()
