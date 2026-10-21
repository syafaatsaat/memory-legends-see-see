import { getRecords } from './api.js'

// 1600px webp keeps a 1920x1080 wallpaper around 200 KB; it sits dimmed behind content anyway.
const WALLPAPER_PARAMS = '&w=1600&output=webp&q=70'
// Group art tags dozens of heroes (one tags all of them); only keep art about a few.
const MAX_HEROES_IN_ART = 3
// The newest gallery pages are event art without heroes, so the random pick skips page 1.
const GALLERY_PAGES = 12
const GALLERY_PAGE_SIZE = 40

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function toUrls(records) {
  return records
    .filter((record) => {
      const heroIds = record.data.heroid ?? []
      return heroIds.length > 0 && heroIds.length <= MAX_HEROES_IN_ART
    })
    .map((record) => {
      const picture = record.data.pictures.find((p) => p.resolution === '1920x1080') ?? record.data.pictures[0]
      return `${picture.url}${WALLPAPER_PARAMS}`
    })
}

const heroCache = new Map()

// Resolves to a random wallpaper URL for the hero, or null if it has none of its own.
export function fetchHeroWallpaper(heroId) {
  if (!heroCache.has(heroId)) {
    const request = getRecords(`/heroes/${heroId}/wallpapers?device=desktop&size=30`)
      .then((records) => pickRandom(toUrls(records)) ?? null)
      .catch(() => {
        heroCache.delete(heroId)
        return null
      })
    heroCache.set(heroId, request)
  }
  return heroCache.get(heroId)
}

export function fetchRandomWallpaper() {
  const page = 2 + Math.floor(Math.random() * (GALLERY_PAGES - 1))
  return getRecords(`/heroes/wallpapers?device=desktop&size=${GALLERY_PAGE_SIZE}&index=${page}`)
    .then((records) => pickRandom(toUrls(records)) ?? null)
    .catch(() => null)
}
