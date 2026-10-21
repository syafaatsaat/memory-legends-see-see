import { getRecords } from './api.js'

const PAGE_SIZE = 500
// Images go through the wsrv.nl proxy, which can resize: 400px webp is about half the original's weight.
const CARD_IMAGE_PARAMS = '&w=400&output=webp'

// /heroes/positions has the name and roles ("sortid"); the catalog has the 500px splash art ("head_big").
function toHero(positionRecord, artById) {
  const { hero_id: id, hero } = positionRecord.data
  const info = hero.data
  const art = artById.get(id)
  return {
    id,
    name: info.name,
    image: art ? `${art}${CARD_IMAGE_PARAMS}` : info.smallmap,
    // sortid can contain empty-string placeholders; role titles vary in case.
    roles: info.sortid.filter(Boolean).map((entry) => entry.data.sort_title.toLowerCase()),
  }
}

let heroesPromise

export function fetchHeroes() {
  heroesPromise ??= Promise.all([
    getRecords(`/heroes/positions?size=${PAGE_SIZE}`),
    getRecords(`/academy/heroes/catalog?size=${PAGE_SIZE}`),
  ])
    .then(([positionRecords, catalogRecords]) => {
      const artById = new Map(
        catalogRecords.map((record) => [record.data.hero_id, record.data.head_big ?? record.data.head]),
      )
      return positionRecords.map((record) => toHero(record, artById))
    })
    .catch((error) => {
      heroesPromise = undefined
      throw error
    })
  return heroesPromise
}
