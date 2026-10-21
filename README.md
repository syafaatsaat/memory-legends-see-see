# Memory Legends

A hero memory game for Mobile Legends: Bang Bang fans. Every round the board reshuffles —
pick a hero you haven't picked yet. Pick a repeat and the match is over.

Hero data comes from the [Rone Arena API](https://arena.rone.dev/). Fan project, not affiliated with Moonton.

## Modes

| Mode | Roles | Win at | Heroes on board |
| --- | --- | --- | --- |
| Easy | 1 random | 5 picks | 5 |
| Medium | 2 random | 10 picks | 8 |
| Hard | 3 random | 15 picks | 10 |
| Endless | all | never — pool resets after every hero is picked | 12 |

The Endless best score is kept in the browser (localStorage).

## Development

```sh
npm install
npm run dev
```

## Project layout

```
docs/design/      mockups (copy of the design canvas) and design notes
src/components/   React components, one per screen or UI piece
src/state/        game rules, API client, mode config, best-score storage
src/styles/       tokens.css, global.css, one stylesheet per component
```

## Build plan

- [x] 1. Setup — clean template, design tokens, fonts, mode config, API client, best-score storage, Home screen
- [x] 2. Game rules (`src/state/game.js`) — pure functions: pick random roles, build the hero pool, deal a board
      that always contains at least one unpicked hero, handle a pick (win / continue / defeat), Endless pool reset
- [x] 3. Game state hook — `useReducer` around the rules, plus loading and error states for the hero fetch
- [x] 4. Game screen — HUD (mode, roles, score, progress), hero card grid, reshuffle after each pick
- [x] 5. Result screens — Victory, Defeat (shows the repeated hero), Endless record card with best-score save
- [x] 6. Polish — card shuffle animation, portrait preloading, loading skeletons, phone layout pass, reduced motion
- [ ] 7. Wallpapers — blend `/api/heroes/wallpapers` art into the home and result screens
- [ ] 8. Ship — production build, deploy
