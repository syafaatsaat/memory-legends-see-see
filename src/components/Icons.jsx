// The Memory Legends mark: two stacked cut-corner cards (the hero card shape) with a gem.
// Card faces are filled with the page color so the front card hides the back one's outline.
export function LogoIcon({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="miter" aria-hidden="true">
      <path d="M12 2.5h9v11.5l-3 3H9v-11.5z" style={{ fill: 'var(--bg)' }} />
      <path d="M6 7.5h9V19l-3 3H3V10.5z" style={{ fill: 'var(--bg)' }} />
      <path d="M9 12.2l2.4 2.6L9 17.4l-2.4-2.6z" fill="currentColor" stroke="none" />
    </svg>
  )
}

// A single cut-corner card with a tick (victory) or a cross (defeat).
export function ResultCardIcon({ size = 40, crossed = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="miter" aria-hidden="true">
      <path d="M8 2.5h11v15l-4 4H5v-15z" />
      <path d={crossed ? 'm9.5 9.5 5 5m0-5-5 5' : 'm8.8 12.3 2.4 2.5 4.1-5'} />
    </svg>
  )
}

export function InfinityIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4Zm0 0c2 2.7 3.6 4 5.5 4a4 4 0 0 0 0-8c-1.9 0-3.5 1.3-5.5 4Z" />
    </svg>
  )
}

export function HelpIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5" />
      <path d="M12 18.5h.01" />
    </svg>
  )
}

export function BackIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  )
}
