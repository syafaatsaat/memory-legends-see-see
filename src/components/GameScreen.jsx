import { useEffect, useMemo, useState } from 'react'
import { featuredHero } from '../state/game.js'
import { fetchHeroWallpaper } from '../state/wallpapersApi.js'
import GameHelp from './GameHelp.jsx'
import { BackIcon } from './Icons.jsx'
import HeroCard from './HeroCard.jsx'
import { useBoardFit } from './useBoardFit.js'
import { usePreloadImages } from './usePreloadImages.js'
import '../styles/GameScreen.css'

// How long the last pick stays on screen (shake or pop) before the result screen.
const FINISH_DELAY_MS = 900

function Progress({ game }) {
  if (game.mode.id === 'endless') {
    const used = game.pickedIds.length
    const total = game.pool.length
    return (
      <div className="game__progress">
        <div className="game__pool-bar" role="progressbar" aria-label="Hero pool used" aria-valuemin={0} aria-valuemax={total} aria-valuenow={used}>
          <span style={{ width: `${(used / total) * 100}%` }} />
        </div>
        <p className="game__pool-text">
          Pool {used} / {total}
          {game.resets > 0 && ` · Reset ${game.resets}×`}
        </p>
      </div>
    )
  }

  return (
    <div className="game__progress">
      <div className="game__segments" style={{ '--segments': game.mode.target }} role="img" aria-label={`${game.score} of ${game.mode.target} picks`}>
        {Array.from({ length: game.mode.target }, (_, i) => (
          <span key={i} className={i < game.score ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  )
}

function GameScreen({ game, bestScore, onPick, onQuit, onFinished }) {
  const { mode } = game
  const isEndless = mode.id === 'endless'
  const isPlaying = game.status === 'playing'
  // The deal whose board the pointer has moved over; hover highlights wait for it.
  const [hoverRound, setHoverRound] = useState(-1)
  const [helpOpen, setHelpOpen] = useState(false)

  const { areaRef, boardRef, fit } = useBoardFit(game.board.length, mode.columns)

  const poolImages = useMemo(() => game.pool.map((hero) => hero.image), [game.pool])
  usePreloadImages(poolImages)

  useEffect(() => {
    if (isPlaying) return
    // Start loading the result screen's wallpaper during the pause.
    fetchHeroWallpaper(featuredHero(game).id).then((url) => {
      if (url) new Image().src = url
    })
    const timer = setTimeout(onFinished, FINISH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isPlaying, onFinished, game])

  function pickHero(heroId) {
    setHelpOpen(false)
    onPick(heroId)
  }

  const lastPickId = game.history.at(-1)?.id
  function highlightFor(hero) {
    if (game.status === 'lost' && hero.id === game.repeatedHero.id) return 'repeat'
    if (game.status === 'won' && hero.id === lastPickId) return 'picked'
    return null
  }

  return (
    <div className="game">
      <header className="game__hud container">
        <div className="game__mode">
          <button type="button" className="game__back bevel" aria-label="Back to modes" onClick={onQuit}>
            <BackIcon />
          </button>
          <h1 className="game__mode-name">{mode.label}</h1>
          <ul className="game__roles" aria-label="Roles in play">
            {isEndless ? <li>All heroes</li> : game.roles.map((role) => <li key={role}>{role}</li>)}
          </ul>
        </div>
        <div className="game__scores">
          {isEndless && (
            <div className="game__best">
              <span className="game__label">Best</span>
              <span className="game__best-value">{bestScore}</span>
            </div>
          )}
          <div className="game__score" aria-live="polite">
            <span className="game__label">Picks</span>
            <span className="game__score-value">{game.score}</span>
            {!isEndless && <span className="game__score-target">/ {mode.target}</span>}
          </div>
        </div>
        <GameHelp mode={mode} open={helpOpen} onOpenChange={setHelpOpen} />
      </header>

      <div className="container">
        <Progress game={game} />
      </div>

      <main className="container game__main">
        {/* The space left for the board; its size decides how big the cards can be. */}
        <div ref={areaRef} className={`game__area ${fit?.overflows ? 'is-overflowing' : ''}`}>
          {/* Keyed by deal so every new board remounts and deals in. */}
          <div
            key={game.deal}
            ref={boardRef}
            className={['game__board', fit && 'is-fit', fit?.compact && 'is-compact', hoverRound === game.deal && 'is-hover-ready'].filter(Boolean).join(' ')}
            style={fit ? { '--cols': fit.cols, width: fit.boardWidth } : { '--preferred-cols': mode.columns }}
            onPointerMove={() => setHoverRound(game.deal)}
          >
            {game.board.map((hero, index) => (
              <HeroCard key={hero.id} hero={hero} index={index} highlight={highlightFor(hero)} disabled={!isPlaying} onPick={pickHero} />
            ))}
          </div>
        </div>
        <p className="game__hint">Pick a hero you haven't picked yet. The board reshuffles after every pick.</p>
      </main>
    </div>
  )
}

export default GameScreen
