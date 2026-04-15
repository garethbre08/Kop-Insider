const PLAYER_NAMES: Record<string, string> = {
  'alisson': '/images/players/alisson.jpg',
  'bradley': '/images/players/bradley.jpg',
  'chiesa': '/images/players/chiesa.jpg',
  'ekitike': '/images/players/ekitike.jpg',
  'ekitiké': '/images/players/ekitike.jpg',
  'endo': '/images/players/endo.jpg',
  'frimpong': '/images/players/frimpong.jpg',
  'gakpo': '/images/players/gakpo.jpg',
  'gomez': '/images/players/gomez.jpg',
  'gravenberch': '/images/players/gravenberch.jpg',
  'isak': '/images/players/isak.jpg',
  'jones': '/images/players/jones.jpg',
  'jota': '/images/players/jota.jpg',
  'kerkez': '/images/players/kerkez.jpg',
  'konate': '/images/players/konate.jpg',
  'leoni': '/images/players/leoni.jpg',
  'mac-allister': '/images/players/mac-allister.jpg',
  'mac allister': '/images/players/mac-allister.jpg',
  'macallister': '/images/players/mac-allister.jpg',
  'mamardashvili': '/images/players/mamardashvili.jpg',
  'ndiaye': '/images/players/ndiaye.jpg',
  'ngumoha': '/images/players/ngumoha.jpg',
  'robertson': '/images/players/robertson.jpg',
  'salah': '/images/players/salah.jpg',
  'szoboszlai': '/images/players/szoboszlai.jpg',
  'van dijk': '/images/players/van-dijk.jpg',
  'van-dijk': '/images/players/van-dijk.jpg',
  'vandijk': '/images/players/van-dijk.jpg',
  'wirtz': '/images/players/wirtz.jpg',
  'woodman': '/images/players/woodman.jpg',
  'wright': '/images/players/wright.jpg',
  'elliott': '/images/players/elliott.jpg',
  'harvey elliott': '/images/players/elliott.jpg',
  'harvey': '/images/players/elliott.jpg',
}

const OWNER_NAMES: Record<string, string> = {
  'fsg': '/images/owners/fsg.jpg',
  'fenway': '/images/owners/fsg.jpg',
  'fenway sports group': '/images/owners/fsg.jpg',
  'john henry': '/images/owners/henry.jpg',
  'henry': '/images/owners/henry.jpg',
  'tom werner': '/images/owners/werner.jpg',
  'werner': '/images/owners/werner.jpg',
  'michael edwards': '/images/owners/edwards.jpg',
  'edwards': '/images/owners/edwards.jpg',
  'richard hughes': '/images/owners/hughes.jpg',
  'hughes': '/images/owners/hughes.jpg',
  'billy hogan': '/images/owners/hogan.jpg',
  'hogan': '/images/owners/hogan.jpg',
}

const MANAGER_NAMES: Record<string, string> = {
  'slot': '/images/managers/slot.jpg',
  'arne slot': '/images/managers/slot.jpg',
  'gerrard': '/images/managers/gerrard.jpg',
  'steven gerrard': '/images/managers/gerrard.jpg',
  'alonso': '/images/managers/alonso.jpg',
  'xabi alonso': '/images/managers/alonso.jpg',
  'klopp': '/images/managers/klopp.jpg',
  'jurgen klopp': '/images/managers/klopp.jpg',
}

const STADIUM_IMAGES = [
  '/images/stadium/anfield-1.jpg',
  '/images/stadium/anfield-2.jpg',
  '/images/stadium/anfield-3.jpg',
  '/images/stadium/anfield-4.jpg',
  '/images/stadium/anfield-5.jpg',
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

export function getPlayerImageFromText(title: string, content?: string): string | null {
  const lowerTitle = title.toLowerCase()
  const lowerContent = (content || '').toLowerCase()

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
