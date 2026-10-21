// Rone Arena API serves the same data from two hosts; try the next one if a host fails.
const HOSTS = ['https://arena.fastapicloud.dev/api', 'https://arena.rone.dev/api']

export async function getRecords(path) {
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
