import { InfinityIcon } from './Icons.jsx'
import '../styles/ModeCard.css'

function DifficultyPips({ level }) {
  return (
    <div className="mode-card__pips" role="img" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= level ? 'is-on' : ''} />
      ))}
    </div>
  )
}

function ModeCard({ mode, bestScore, onSelect }) {
  const isEndless = mode.id === 'endless'
  const rows = [
    ['Roles', isEndless ? 'All heroes' : `${mode.roleCount} random`],
    ['Win at', isEndless ? 'Never ends' : `${mode.target} picks`],
    ['On board', `${mode.boardSize} heroes`],
  ]

  return (
    <button type="button" className={`mode-card bevel ${isEndless ? 'mode-card--endless' : ''}`} onClick={() => onSelect(mode.id)}>
      <span className="mode-card__inner bevel">
        <span className="mode-card__head">
          <span className="mode-card__title">{mode.label}</span>
          {isEndless ? <InfinityIcon /> : <DifficultyPips level={mode.level} />}
        </span>
        <dl className="mode-card__rows">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <span className="mode-card__foot">
          <span className="mode-card__play">Play →</span>
          {isEndless && (
            <span className="mode-card__best">
              Best <strong>{bestScore}</strong>
            </span>
          )}
        </span>
      </span>
    </button>
  )
}

export default ModeCard
