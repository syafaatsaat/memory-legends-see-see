import { BackIcon } from './Icons.jsx'
import HeroCard from './HeroCard.jsx'
import '../styles/GameScreen.css'

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

function GameScreen({ game, bestScore, onPick, onQuit }) {
  const { mode } = game
  const isEndless = mode.id === 'endless'
  const isPlaying = game.status === 'playing'

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
      </header>

      <div className="container">
        <Progress game={game} />
      </div>

      <main className="container game__main">
        <div className="game__board" style={{ '--cols': mode.columns }}>
          {game.board.map((hero) => (
            <HeroCard key={hero.id} hero={hero} disabled={!isPlaying} onPick={onPick} />
          ))}
        </div>
        <p className="game__hint">Pick a hero you haven't picked yet. The board reshuffles after every pick.</p>
      </main>
    </div>
  )
}

export default GameScreen
