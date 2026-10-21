import { useCallback, useEffect, useReducer } from 'react'
import { loadBestScore, saveBestScore } from './bestScore.js'
import { createGame, pickHero } from './game.js'
import { newSeed, seededRandom } from './random.js'

// bestScore: the Endless record, including the current run once it beats the old one.
// previousBest: the record before this run, for the "new record" card.
function init() {
  const best = loadBestScore()
  return { game: null, bestScore: best, previousBest: best }
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        game: createGame(action.mode, action.heroes, seededRandom(action.seed)),
        previousBest: state.bestScore,
      }
    case 'pick': {
      if (!state.game) return state
      const game = pickHero(state.game, action.heroId, seededRandom(action.seed))
      const isEndless = game.mode.id === 'endless'
      const bestScore = isEndless ? Math.max(state.bestScore, game.score) : state.bestScore
      return { ...state, game, bestScore }
    }
    case 'quit':
      return { ...state, game: null }
    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, init)

  useEffect(() => {
    saveBestScore(state.bestScore)
  }, [state.bestScore])

  const start = useCallback((mode, heroes) => dispatch({ type: 'start', mode, heroes, seed: newSeed() }), [])
  const pick = useCallback((heroId) => dispatch({ type: 'pick', heroId, seed: newSeed() }), [])
  const quit = useCallback(() => dispatch({ type: 'quit' }), [])

  const { game, bestScore, previousBest } = state
  const isNewRecord = game?.mode.id === 'endless' && game.score > previousBest

  return { game, bestScore, previousBest, isNewRecord, start, pick, quit }
}
