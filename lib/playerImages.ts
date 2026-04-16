const PLAYER_NAMES: Record<string, string> = {
  'alisson': '/images/alisson.jpg',
  'bradley': '/images/bradley.jpg',
  'carragher': '/images/carragher.jpg',
  'jamie carragher': '/images/carragher.jpg',
  'chiesa': '/images/chiesa.jpg',
  'ekitike': '/images/ekitike.jpg',
  'ekitiké': '/images/ekitike.jpg',
  'endo': '/images/endo.jpg',
  'frimpong': '/images/frimpong.jpg',
  'gakpo': '/images/gakpo.jpg',
  'gomez': '/images/gomez.jpg',
  'gravenberch': '/images/gravenberch.jpg',
  'isak': '/images/isak.jpg',
  'jones': '/images/jones.jpg',
  'jota': '/images/jota.jpg',
  'kerkez': '/images/kerkez.jpg',
  'konate': '/images/konate.jpg',
  'leoni': '/images/leoni.jpg',
  'mac-allister': '/images/mac-allister.jpg',
  'mac allister': '/images/mac-allister.jpg',
  'macallister': '/images/mac-allister.jpg',
  'mamardashvili': '/images/mamardashvili.jpg',
  'ndiaye': '/images/ndiaye.jpg',
  'ngumoha': '/images/ngumoha.jpg',
  'robertson': '/images/robertson.jpg',
  'salah': '/images/salah.jpg',
  'szoboszlai': '/images/szoboszlai.jpg',
  'thiago': '/images/thiago.jpg',
  'thiago alcantara': '/images/thiago.jpg',
  'van dijk': '/images/van-dijk.jpg',
  'van-dijk': '/images/van-dijk.jpg',
  'vandijk': '/images/van-dijk.jpg',
  'wirtz': '/images/wirtz.jpg',
  'woodman': '/images/woodman.jpg',
  'wright': '/images/wright.jpg',
  'elliott': '/images/elliott.jpg',
  'harvey elliott': '/images/elliott.jpg',
  'harvey': '/images/elliott.jpg',
}

const OWNER_NAMES: Record<string, string> = {
  'fsg': '/images/fsg.jpg',
  'fenway': '/images/fsg.jpg',
  'fenway sports group': '/images/fsg.jpg',
  'john henry': '/images/henry.jpg',
  'henry': '/images/henry.jpg',
  'tom werner': '/images/werner.jpg',
  'werner': '/images/werner.jpg',
  'michael edwards': '/images/edwards.jpg',
  'edwards': '/images/edwards.jpg',
  'richard hughes': '/images/hughes.jpg',
  'hughes': '/images/hughes.jpg',
  'billy hogan': '/images/hogan.jpg',
  'hogan': '/images/hogan.jpg',
}

const MANAGER_NAMES: Record<string, string> = {
  'slot': '/images/slot.jpg',
  'arne slot': '/images/slot.jpg',
  'gerrard': '/images/gerrard.jpg',
  'steven gerrard': '/images/gerrard.jpg',
  'alonso': '/images/alonso.jpg',
  'xabi alonso': '/images/alonso.jpg',
  'klopp': '/images/klopp.jpg',
  'jurgen klopp': '/images/klopp.jpg',
}

const STADIUM_IMAGES = [
  '/images/anfield-1.jpg',
  '/images/anfield-2.jpg',
  '/images/anfield-3.jpg',
  '/images/anfield-4.jpg',
  '/images/anfield-5.jpg',
]

const HILLSBOROUGH_IMAGES = [
  '/images/hillsborough-1.jpg',
  '/images/hillsborough-2.jpg',
]

const STADIUM_KEYWORDS = [
  'anfield',
  'stadium',
  'ground',
  'anfield road',
  'the kop',
  'spion kop',
  'main stand',
  'stands',
  'atmosphere',
  'crowd',
  'supporters',
  'fans',
  'ticket',
  'matchday',
]

function getRandomStadiumImage(): string {
  const randomIndex = Math.floor(Math.random() * STADIUM_IMAGES.length)
  return STADIUM_IMAGES[randomIndex]
}

function getRandomHillsboroughImage(): string {
  const randomIndex = Math.floor(Math.random() * HILLSBOROUGH_IMAGES.length)
  return HILLSBOROUGH_IMAGES[randomIndex]
}

export function getPlayerImageFromText(title: string, content?: string): string | null {
  const lowerTitle = title.toLowerCase()
  const lowerContent = (content || '').toLowerCase()

  if (lowerTitle.includes('hillsborough') || lowerTitle.includes('the 97') || lowerTitle.includes('the 96')) {
    return getRandomHillsboroughImage()
  }

  for (const [name, imagePath] of Object.entries(PLAYER_NAMES)) {
    if (lowerTitle.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  for (const [name, imagePath] of Object.entries(MANAGER_NAMES)) {
    if (lowerTitle.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  for (const [name, imagePath] of Object.entries(OWNER_NAMES)) {
    if (lowerTitle.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  for (const [name, imagePath] of Object.entries(PLAYER_NAMES)) {
    if (lowerContent.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  const isStadiumRelated = STADIUM_KEYWORDS.some(keyword => lowerTitle.includes(keyword))
  if (isStadiumRelated) {
    return getRandomStadiumImage()
  }

  for (const [name, imagePath] of Object.entries(MANAGER_NAMES)) {
    if (lowerContent.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  for (const [name, imagePath] of Object.entries(OWNER_NAMES)) {
    if (lowerContent.includes(name.toLowerCase())) {
      return imagePath
    }
  }

  const isStadiumInContent = STADIUM_KEYWORDS.some(keyword => lowerContent.includes(keyword))
  if (isStadiumInContent) {
    return getRandomStadiumImage()
  }

  return null
}

export function getRandomPlayerImage(): string {
  const allImages = [
    ...Object.values(PLAYER_NAMES),
    ...Object.values(MANAGER_NAMES),
    ...Object.values(OWNER_NAMES),
    ...STADIUM_IMAGES,
  ]
  const randomIndex = Math.floor(Math.random() * allImages.length)
  return allImages[randomIndex]
}
