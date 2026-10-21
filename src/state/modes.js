export const ROLES = ['tank', 'fighter', 'assassin', 'mage', 'marksman', 'support']

// roleCount: null means every hero is in the pool.
// target: Infinity means the run only ends on a repeat pick.
// columns: board grid columns on wide screens, chosen so every board fills whole rows.
export const MODES = [
  { id: 'easy', label: 'Easy', level: 1, roleCount: 1, target: 5, boardSize: 5, columns: 5 },
  { id: 'medium', label: 'Medium', level: 2, roleCount: 2, target: 10, boardSize: 8, columns: 4 },
  { id: 'hard', label: 'Hard', level: 3, roleCount: 3, target: 15, boardSize: 10, columns: 5 },
  { id: 'endless', label: 'Endless', level: null, roleCount: null, target: Infinity, boardSize: 12, columns: 6 },
]

export function getMode(id) {
  return MODES.find((mode) => mode.id === id)
}
