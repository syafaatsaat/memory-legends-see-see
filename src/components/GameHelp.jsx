import { useEffect, useRef } from 'react'
import { HelpIcon } from './Icons.jsx'
import '../styles/GameHelp.css'

// "?" button with a small hint panel, shown where the board's hint line is hidden (phones,
// short screens; see GameHelp.css). A disclosure: the button toggles the panel, which closes
// on a tap outside (without that tap picking a hero) or on Escape.
function GameHelp({ mode, open, onOpenChange }) {
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event) {
      if (wrapperRef.current.contains(event.target)) return
      onOpenChange(false)
      // The tap that closes the panel must not also pick the hero card under it, so swallow
      // the click it produces. Time-limited so a drag/scroll (no click) can't eat a later tap.
      const swallowClick = (clickEvent) => {
        clickEvent.stopPropagation()
        clickEvent.preventDefault()
      }
      document.addEventListener('click', swallowClick, { capture: true, once: true })
      setTimeout(() => document.removeEventListener('click', swallowClick, { capture: true }), 600)
    }
    function onKeyDown(event) {
      if (event.key !== 'Escape') return
      onOpenChange(false)
      buttonRef.current.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  const goal =
    mode.id === 'endless'
      ? 'Go as long as you can. Once every hero has been picked, the pool resets.'
      : `Reach ${mode.target} unique picks to win.`

  return (
    <div ref={wrapperRef} className="game-help">
      <button
        ref={buttonRef}
        type="button"
        className={`game-help__button bevel ${open ? 'is-open' : ''}`}
        aria-label="How to play"
        aria-expanded={open}
        aria-controls="game-help-panel"
        onClick={() => onOpenChange(!open)}
      >
        <HelpIcon />
      </button>
      <div id="game-help-panel" className="game-help__panel bevel" hidden={!open}>
        <p>Pick a hero you haven't picked yet. The board reshuffles after every pick.</p>
        <p className="game-help__goal">{goal}</p>
      </div>
    </div>
  )
}

export default GameHelp
