import { useCallback, useEffect, useState } from 'react'
import { fetchHeroes } from './heroesApi.js'

// Loads the hero list once on app start, so it is usually ready before a mode is chosen.
// status: 'loading' | 'ready' | 'error'
export function useHeroes() {
  const [state, setState] = useState({ status: 'loading', heroes: [], error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetchHeroes()
      .then((heroes) => {
        if (!cancelled) setState({ status: 'ready', heroes, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', heroes: [], error })
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading', heroes: [], error: null })
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, retry }
}
