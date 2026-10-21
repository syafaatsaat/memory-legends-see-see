// Rone Arena API serves the same data from two hosts; try the next one if a host fails.
const HOSTS = ['https://arena.fastapicloud.dev/api', 'https://arena.rone.dev/api']
const PAGE_SIZE = 500

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

// /heroes has the portrait ("head"), /heroes/positions has the roles ("sortid").
function toHero(positionRecord, portraits) {
  const { hero_id: id, hero } = positionRecord.data
  const info = hero.data
  return {
    id,
    name: info.name,
    image: portraits.get(id) ?? info.smallmap,
    // sortid can contain empty-string placeholders; role titles vary in case.
    roles: info.sortid.filter(Boolean).map((entry) => entry.data.sort_title.toLowerCase()),
  }
}

let heroesPromise

export function fetchHeroes() {
  heroesPromise ??= Promise.all([
    getJson(`/heroes?size=${PAGE_SIZE}`),
    getJson(`/heroes/positions?size=${PAGE_SIZE}`),
  ])
    .then(([heroRecords, positionRecords]) => {
      const portraits = new Map(
        heroRecords.map((record) => [record.data.hero_id, record.data.hero.data.head]),
      )
      return positionRecords.map((record) => toHero(record, portraits))
    })
    .catch((error) => {
      heroesPromise = undefined
      throw error
    })
  return heroesPromise
}
