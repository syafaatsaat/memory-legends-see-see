import { InfinityIcon } from './Icons.jsx'
import { useAutoFocus } from './useAutoFocus.js'
import '../styles/ResultScreen.css'

const dateFormat = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

// The record card is laid out to be screenshotted and shared as-is.
function EndlessOverScreen({ game, bestScore, previousBest, isNewRecord, onPlayAgain, onChangeMode }) {
  const headingRef = useAutoFocus()

  return (
    <div className="result result--endless">
      <section className="result__record bevel" aria-labelledby="result-title">
        <div className="result__record-inner bevel">
          <div className="result__record-head">
            <span className="result__brand">Memory Legends</span>
            <span className="result__endless-tag">
              <InfinityIcon size={18} />
              Endless
            </span>
          </div>

          <h1 ref={headingRef} id="result-title" tabIndex={-1} className={`result__badge ${isNewRecord ? 'is-record' : ''}`}>
            {isNewRecord ? 'New record' : 'Game over'}
          </h1>
          <p className="result__big-score">{game.score}</p>
          <span className="result__label">Unique picks in a row</span>

          <dl className="result__stats result__stats--small">
            <div>
              <dt>{isNewRecord ? 'Previous best' : 'Best'}</dt>
              <dd>{isNewRecord ? previousBest : bestScore}</dd>
            </div>
            <div>
              <dt>Pool resets</dt>
              <dd>{game.resets}</dd>
            </div>
            <div>
              <dt>Ended on</dt>
              <dd>{game.repeatedHero.name}</dd>
            </div>
          </dl>
          <span className="result__date">{dateFormat.format(new Date())}</span>
        </div>
      </section>

      <p className="result__hint">Screenshot this card to share your score.</p>

      <div className="result__actions">
        <button type="button" className="btn btn--primary bevel" onClick={onPlayAgain}>Play again</button>
        <button type="button" className="btn btn--secondary bevel" onClick={onChangeMode}>Change mode</button>
      </div>
    </div>
  )
}

export default EndlessOverScreen
