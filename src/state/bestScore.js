const KEY = 'memory-legends:endless-best'

// Storage can be unavailable (private windows, blocked site data), so every access is guarded.
export function loadBestScore() {
  try {
    return Number(localStorage.getItem(KEY)) || 0
  } catch {
    return 0
  }
}

export function saveBestScore(score) {
  try {
    localStorage.setItem(KEY, String(score))
  } catch {
    // Best score just won't persist this session.
  }
}
