import { LogoIcon } from './Icons.jsx'
import '../styles/LoadScreen.css'

// Shown when a mode is picked before the hero list has arrived, or if loading it failed.
function LoadScreen({ status, onRetry, onBack }) {
  const failed = status === 'error'

  return (
    <div className="load" role={failed ? 'alert' : 'status'}>
      <span className={`load__icon ${failed ? 'is-error' : ''}`}>
        <LogoIcon size={48} />
      </span>
      {failed ? (
        <>
          <h1>Couldn't load heroes</h1>
          <p>The hero server may be busy. Try again in a moment.</p>
          <div className="load__actions">
            <button type="button" className="btn btn--primary bevel" onClick={onRetry}>Try again</button>
            <button type="button" className="btn btn--secondary bevel" onClick={onBack}>Back</button>
          </div>
        </>
      ) : (
        <h1>Summoning heroes…</h1>
      )}
    </div>
  )
}

export default LoadScreen
