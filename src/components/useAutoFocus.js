import { useEffect, useRef } from 'react'

// Focuses the element on mount. Result headings use it so screen readers announce
// the result instead of staying on the hero card that was clicked.
export function useAutoFocus() {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}
