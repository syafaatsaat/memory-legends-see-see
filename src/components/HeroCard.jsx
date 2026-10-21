import '../styles/HeroCard.css'

function HeroCard({ hero, disabled, onPick }) {
  return (
    <button type="button" className="hero-card bevel" disabled={disabled} onClick={() => onPick(hero.id)}>
      <span className="hero-card__inner bevel">
        <img className="hero-card__art" src={hero.image} alt="" width="400" height="400" decoding="async" />
        <span className="hero-card__text">
          <span className="hero-card__name">{hero.name}</span>
          <span className="hero-card__roles">{hero.roles.join(' · ')}</span>
        </span>
      </span>
    </button>
  )
}

export default HeroCard
