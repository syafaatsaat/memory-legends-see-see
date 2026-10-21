import { useEffect } from 'react'

const START_DELAY_MS = 600

// Warms the browser cache for the hero pool so reshuffled boards show art instantly.
// Waits a moment and asks for low priority so the current board's images load first.
export function usePreloadImages(urls) {
  useEffect(() => {
    const images = []
    const timer = setTimeout(() => {
      for (const url of urls) {
        const image = new Image()
        image.fetchPriority = 'low'
        image.decoding = 'async'
        image.src = url
        images.push(image)
      }
    }, START_DELAY_MS)

    return () => {
      clearTimeout(timer)
      // Cancels downloads that haven't finished when the match ends.
      for (const image of images) image.removeAttribute('src')
    }
  }, [urls])
}
