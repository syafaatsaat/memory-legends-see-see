// Seeded generator (mulberry32). Reducers get a seed in the action instead of calling
// Math.random, so they stay pure and StrictMode's double run deals the same board.
export function seededRandom(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function newSeed() {
  return Math.floor(Math.random() * 2 ** 32)
}
