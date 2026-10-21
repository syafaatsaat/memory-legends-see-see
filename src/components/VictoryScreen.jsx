import ResultHeading from './ResultHeading.jsx'
import '../styles/ResultScreen.css'

function VictoryScreen({ game, onPlayAgain, onChangeMode }) {
  const { mode, roles, history } = game

  return (
    <div className="result result--victory">
      <section className="result__body" aria-labelledby="result-title">
        <ResultHeading title="Victory" tone="victory" />
        <p className="result__lead">
          {mode.label} cleared — {mode.target} unique heroes, no repeats.
        </p>

        <dl className="result__stats">
          <div>
            <dt>Picks</dt>
            <dd>{game.score} / {mode.target}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{mode.label}</dd>
          </div>
          <div>
            <dt>{roles.length > 1 ? 'Roles' : 'Role'}</dt>
            <dd className="result__stat-roles">{roles.join(', ')}</dd>
          </div>
        </dl>

        <div className="result__picks">
          <h2>Your picks, in order</h2>
          <ol>
            {history.map((hero) => (
              <li key={hero.id}>{hero.name}</li>
            ))}
          </ol>
        </div>

        <div className="result__actions">
          <button type="button" className="btn btn--primary bevel" onClick={onPlayAgain}>Play again</button>
          <button type="button" className="btn btn--secondary bevel" onClick={onChangeMode}>Change mode</button>
        </div>
      </section>
    </div>
  )
}

export default VictoryScreen
