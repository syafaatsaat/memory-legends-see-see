import { MODES } from '../state/modes.js'
import { useWallpaper } from '../state/useWallpaper.js'
import { LogoIcon } from './Icons.jsx'
import ModeCard from './ModeCard.jsx'
import Wallpaper from './Wallpaper.jsx'
import '../styles/HomeScreen.css'

const STEPS = [
  ['Pick a hero', "Click any hero on the board you haven't picked this match."],
  ['Board reshuffles', 'Heroes swap places after every pick. Keep track in your head.'],
  ["Don't repeat", "Pick a hero twice and it's defeat. Reach the target to claim victory."],
]

function HomeScreen({ bestScore, onSelectMode }) {
  const wallpaper = useWallpaper()

  return (
    <div className="home">
      <Wallpaper url={wallpaper} placement="banner" />
      <header className="home__bar container">
        <div className="home__logo">
          <LogoIcon />
          {/* One line on wide screens, "See See" on its own line on narrow ones (HomeScreen.css). */}
          <span className="home__wordmark">
            Memory Legends<span className="home__wordmark-sep">: </span>
            <span className="home__wordmark-sub">See See</span>
          </span>
        </div>
        <a href="#how-to-play" className="home__how-link">How to play</a>
      </header>

      <section className="home__hero container">
        <span className="home__kicker">A hero memory challenge</span>
        <h1>Never pick the same hero twice.</h1>
        <p>Every round the board reshuffles. Pick a hero you haven't picked yet — pick a repeat and the match is over.</p>
      </section>

      <section className="home__section container" aria-labelledby="modes-title">
        <h2 id="modes-title" className="eyebrow">Choose your mode</h2>
        <div className="home__modes">
          {MODES.map((mode) => (
            <ModeCard key={mode.id} mode={mode} bestScore={bestScore} onSelect={onSelectMode} />
          ))}
        </div>
      </section>

      <section id="how-to-play" className="home__section container" aria-labelledby="how-title">
        <h2 id="how-title" className="eyebrow">How to play</h2>
        <ol className="home__steps">
          {STEPS.map(([title, text], i) => (
            <li key={title}>
              <span className="home__step-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="home__footer">
        Fan project. Hero data from the <a href="https://arena.rone.dev/">Rone Arena API</a>. Hero art and wallpapers © Moonton.
        Not affiliated with or endorsed by Moonton.
      </footer>
    </div>
  )
}

export default HomeScreen
