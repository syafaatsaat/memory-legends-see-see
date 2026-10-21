import { useState } from 'react'
import '../styles/Wallpaper.css'

// Decorative hero art behind a screen, faded into the background color.
// placement: 'banner' (top-right of the home screen) or 'full' (behind the whole screen).
// The parent needs `position: relative; isolation: isolate`.
function Wallpaper({ url, placement }) {
  const [loadedUrl, setLoadedUrl] = useState(null)
  if (!url) return null

  return (
    <div className={`wallpaper wallpaper--${placement} ${loadedUrl === url ? 'is-loaded' : ''}`} aria-hidden="true">
      <img src={url} alt="" onLoad={() => setLoadedUrl(url)} />
    </div>
  )
}

export default Wallpaper
