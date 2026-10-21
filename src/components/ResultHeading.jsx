import { ShieldIcon } from './Icons.jsx'
import { useAutoFocus } from './useAutoFocus.js'

// Big VICTORY / DEFEAT title between two rules.
function ResultHeading({ title, tone }) {
  const headingRef = useAutoFocus()

  return (
    <>
      <div className={`result-rule result-rule--${tone}`}>
        <span />
        <ShieldIcon size={40} crossed={tone === 'defeat'} />
        <span />
      </div>
      <h1 ref={headingRef} id="result-title" tabIndex={-1} className={`result-title result-title--${tone}`}>
        {title}
      </h1>
    </>
  )
}

export default ResultHeading
