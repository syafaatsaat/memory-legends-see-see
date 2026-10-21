# Design

Mockups for every screen live on the design canvas:
https://claude.ai/artifact/QPi3CTBH5TSkR1me3hgH31 (private — share it from the canvas's Share menu).

The `*.dc.html` files here are a copy of that canvas's source, kept in the repo for reference.
They are not part of the app build.

| File | Screen |
| --- | --- |
| `Main.dc.html` | Home / mode select |
| `Game.dc.html` | In game (Medium shown) |
| `Victory.dc.html` | Victory |
| `Defeat.dc.html` | Defeat — shows the repeated hero |
| `Endless.dc.html` | Endless game over — screenshot-friendly record card |

## Look

Dark navy ground, gold primary accent, blue secondary accent, beveled (cut-corner) panels
and buttons, flat surfaces — no glows or gradient washes.

- Display: **Rajdhani** 600/700, uppercase with wide letter-spacing for labels
- Body: **Inter** 400/500/600

All colors and sizes are tokens in `src/styles/tokens.css`.

## Modes

| Mode | Roles | Win at | Heroes on board |
| --- | --- | --- | --- |
| Easy | 1 random | 5 picks | 5 |
| Medium | 2 random | 10 picks | 8 |
| Hard | 3 random | 15 picks | 10 |
| Endless | all | never — pool resets once every hero is picked | 12 |

Rules: picked heroes are never marked on the board; the board reshuffles after every pick.

## Later

- Blend hero wallpapers (`/api/heroes/wallpapers`) into the home and result screens.
