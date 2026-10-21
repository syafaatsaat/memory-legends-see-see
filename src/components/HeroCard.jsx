import { useState } from 'react'
import '../styles/HeroCard.css'

// highlight: 'repeat' (the losing pick) or 'picked' (the winning pick) while the match wraps up.
function HeroCard({ hero, index, highlight, disabled, onPick }) {
  // Only stops the placeholder shimmer. The art is never hidden waiting for this: hiding it
  // and fading it in on load sometimes left Chrome showing a blank card until a repaint.
  const [loaded, setLoaded] = useState(false)
  const className = ['hero-card', 'bevel', highlight && `is-${highlight}`].filter(Boolean).join(' ')

  return (
    <button type="button" className={className} style={{ '--i': index }} disabled={disabled} onClick={() => onPick(hero.id)}>
      <span className="hero-card__inner bevel">
        <span className={`hero-card__frame ${loaded ? 'is-loaded' : ''}`}>
          <img className="hero-card__art" src={hero.image} alt="" width="400" height="400" onLoad={() => setLoaded(true)} />
        </span>
        <span className="hero-card__text">
          <span className="hero-card__name">{hero.name}</span>
          <span className="hero-card__roles">{hero.roles.join(' · ')}</span>
        </span>
      </span>
    </button>
  )
}

export default HeroCard
