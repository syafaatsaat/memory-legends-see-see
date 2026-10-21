import { ROLES } from './modes.js'

// Every function takes an optional `random` so tests can pass a seeded generator.

export function shuffle(items, random = Math.random) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function pickRandomRoles(count, random = Math.random) {
  return shuffle(ROLES, random).slice(0, count)
}

// A hero with several roles joins the pool if any of them matches.
export function buildPool(heroes, roles) {
  if (!roles) return heroes
  return heroes.filter((hero) => hero.roles.some((role) => roles.includes(role)))
}

// Deals a random board from the pool that always holds at least one unpicked hero,
// so the player can never be forced into a repeat.
export function dealBoard(pool, pickedIds, size, random = Math.random) {
  const board = shuffle(pool, random).slice(0, size)
  if (board.some((hero) => !pickedIds.includes(hero.id))) return board

  const unpicked = pool.filter((hero) => !pickedIds.includes(hero.id))
  const slot = Math.floor(random() * board.length)
  board[slot] = unpicked[Math.floor(random() * unpicked.length)]
  return board
}

export function createGame(mode, heroes, random = Math.random) {
  const roles = mode.roleCount ? pickRandomRoles(mode.roleCount, random) : null
  const pool = buildPool(heroes, roles)
  return {
    mode,
    roles,
    pool,
    pickedIds: [], // picks in the current cycle; Endless clears it when the pool runs out
    history: [], // every pick this match, in order
    score: 0,
    resets: 0,
    board: dealBoard(pool, [], mode.boardSize, random),
    deal: 0, // counts boards dealt; the UI keys the board on it to animate each new deal
    status: 'playing', // 'playing' | 'won' | 'lost'
    repeatedHero: null,
  }
}

// The hero a finished match is about: the repeated pick on a loss, the winning pick on a win.
export function featuredHero(game) {
  return game.repeatedHero ?? game.history.at(-1)
}

export function pickHero(game, heroId, random = Math.random) {
  if (game.status !== 'playing') return game

  const hero = game.pool.find((h) => h.id === heroId)
  if (!hero) return game

  if (game.pickedIds.includes(heroId)) {
    return { ...game, status: 'lost', repeatedHero: hero }
  }

  const score = game.score + 1
  const history = [...game.history, hero]
  let pickedIds = [...game.pickedIds, heroId]
  let resets = game.resets

  if (score >= game.mode.target) {
    return { ...game, pickedIds, history, score, status: 'won' }
  }

  if (pickedIds.length === game.pool.length) {
    pickedIds = []
    resets += 1
  }

  return {
    ...game,
    pickedIds,
    history,
    score,
    resets,
    board: dealBoard(game.pool, pickedIds, game.mode.boardSize, random),
    deal: game.deal + 1,
  }
}
