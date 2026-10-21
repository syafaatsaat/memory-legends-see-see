// Rone Arena API serves the same data from two hosts; try the next one if a host fails.
const HOSTS = ['https://arena.fastapicloud.dev/api', 'https://arena.rone.dev/api']
const PAGE_SIZE = 500
// Images go through the wsrv.nl proxy, which can resize: 400px webp is about half the original's weight.
const CARD_IMAGE_PARAMS = '&w=400&output=webp'

async function getJson(path) {
  let lastError
  for (const host of HOSTS) {
    try {
      const response = await fetch(`${host}${path}`)
      if (!response.ok) throw new Error(`${response.status} from ${host}${path}`)
      const body = await response.json()
      return body.data.records
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

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
    getJson(`/heroes/positions?size=${PAGE_SIZE}`),
    getJson(`/academy/heroes/catalog?size=${PAGE_SIZE}`),
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
