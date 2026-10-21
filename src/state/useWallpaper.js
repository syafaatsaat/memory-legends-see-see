import { useEffect, useState } from 'react'
import { fetchHeroWallpaper, fetchRandomWallpaper } from './wallpapersApi.js'

// Wallpaper URL for a hero (falling back to a random one if the hero has none), or a random
// one from the gallery when heroId is undefined. Returns null until it arrives, or if the API
// fails; wallpapers are decoration, so failures stay quiet.
export function useWallpaper(heroId) {
  const [result, setResult] = useState({ heroId: null, url: null })

  useEffect(() => {
    let cancelled = false
    const request =
      heroId === undefined
        ? fetchRandomWallpaper()
        : fetchHeroWallpaper(heroId).then((url) => url ?? fetchRandomWallpaper())
    request.then((url) => {
      if (!cancelled) setResult({ heroId, url })
    })
    return () => {
      cancelled = true
    }
  }, [heroId])

  return result.heroId === heroId ? result.url : null
}
