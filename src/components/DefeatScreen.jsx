import ResultHeading from './ResultHeading.jsx'
import { featuredHero } from '../state/game.js'
import { useWallpaper } from '../state/useWallpaper.js'
import Wallpaper from './Wallpaper.jsx'
import '../styles/ResultScreen.css'

function DefeatScreen({ game, onPlayAgain, onChangeMode }) {
  const wallpaper = useWallpaper(featuredHero(game).id)
  const { mode, roles, score, repeatedHero, history } = game
  const firstPickNumber = history.findIndex((hero) => hero.id === repeatedHero.id) + 1

  return (
    <div className="result result--defeat">
      <Wallpaper url={wallpaper} placement="full" />
      <section className="result__body" aria-labelledby="result-title">
        <ResultHeading title="Defeat" tone="defeat" />
        <p className="result__lead">
          You already picked <strong>{repeatedHero.name}</strong> on pick {firstPickNumber}.
        </p>

        <div className="result__defeat-detail">
          <div className="result__repeat-card bevel">
            <div className="result__repeat-inner bevel">
              <img src={repeatedHero.image} alt="" width="400" height="400" />
              <div>
                <span className="result__repeat-name">{repeatedHero.name}</span>
              </div>
            </div>
          </div>

          <div className="result__defeat-score">
            <div className="result__score-row">
              <span className="result__label">Picks</span>
              <span className="result__score">
                {score} <span>/ {mode.target}</span>
              </span>
            </div>
            <div className="result__segments" style={{ '--segments': mode.target }} role="img" aria-label={`${score} of ${mode.target} picks`}>
              {Array.from({ length: mode.target }, (_, i) => (
                <span key={i} className={i < score ? 'is-on' : i === score ? 'is-miss' : ''} />
              ))}
            </div>
            <span className="result__meta">
              {mode.label} · {roles.join(', ')}
            </span>
          </div>
        </div>

        <div className="result__actions">
          <button type="button" className="btn btn--primary bevel" onClick={onPlayAgain}>Try again</button>
          <button type="button" className="btn btn--secondary bevel" onClick={onChangeMode}>Change mode</button>
        </div>
      </section>
    </div>
  )
}

export default DefeatScreen
