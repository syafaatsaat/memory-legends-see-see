import { useEffect, useRef, useState } from 'react'

const MAX_CARD_WIDTH = 190
// Narrower than this, cards switch to compact: square art and the name only (HeroCard.css).
const COMPACT_BELOW = 110
// Name-only text block in compact cards plus the 1px frame; keep in sync with GameScreen.css.
const COMPACT_TEXT_HEIGHT = 35
// Below this names get unreadable; the board scrolls instead of shrinking further.
const MIN_CARD_WIDTH = 64
// Art frame height / width: 4:5 normally, square when compact.
const ART_RATIO = 5 / 4

// Tries every column count and keeps the one giving the widest cards that fit the area.
// Ties go to the mode's preferred column count so wide screens keep their usual layout.
function widestFit({ width, height, count, gap, textHeight, ratio, preferredCols }) {
  let best = null
  for (let cols = 1; cols <= count; cols++) {
    const rows = Math.ceil(count / cols)
    const byWidth = (width - (cols - 1) * gap) / cols
    const byHeight = ((height - (rows - 1) * gap) / rows - textHeight) / ratio
    const cardWidth = Math.floor(Math.min(byWidth, byHeight, MAX_CARD_WIDTH))
    const isBetter = !best || cardWidth > best.cardWidth || (cardWidth === best.cardWidth && cols === preferredCols)
    if (isBetter) best = { cols, cardWidth }
  }
  return best
}

export function bestFit({ width, height, count, gap, textHeight, preferredCols }) {
  const base = { width, height, count, gap, preferredCols }
  let fit = { ...widestFit({ ...base, textHeight, ratio: ART_RATIO }), compact: false }

  if (fit.cardWidth < COMPACT_BELOW) {
    const compact = widestFit({ ...base, textHeight: COMPACT_TEXT_HEIGHT, ratio: 1 })
    // Ties go to compact too: at these widths a normal card's roles line is cut off anyway.
    if (compact.cardWidth >= fit.cardWidth) fit = { ...compact, compact: true }
  }

  if (fit.cardWidth < MIN_CARD_WIDTH) {
    // Too little room even for compact cards: keep them readable and let the page scroll.
    const cols = Math.max(1, Math.min(count, Math.floor((width + gap) / (MIN_CARD_WIDTH + gap))))
    const rows = Math.ceil(count / cols)
    const boardHeight = rows * (MIN_CARD_WIDTH + COMPACT_TEXT_HEIGHT) + (rows - 1) * gap
    fit = { cols, cardWidth: MIN_CARD_WIDTH, compact: true, overflows: boardHeight > height }
  }

  return { overflows: false, ...fit, boardWidth: fit.cols * fit.cardWidth + (fit.cols - 1) * gap }
}

// Measures the space left for the board and sizes the cards so the whole board fits on screen.
// areaRef: the element whose size is the space available; boardRef: the board itself.
// Returns null until the first measurement, so the CSS fallback layout shows for one frame.
export function useBoardFit(count, preferredCols) {
  const areaRef = useRef(null)
  const boardRef = useRef(null)
  // Height of a normal (non-compact) card's name + roles block, measured from the page.
  const textHeightRef = useRef(null)
  const [fit, setFit] = useState(null)

  useEffect(() => {
    const area = areaRef.current
    if (!area) return

    // ResizeObserver also fires once right away, which does the first measurement.
    const observer = new ResizeObserver(() => {
      const board = boardRef.current
      if (!board) return
      const gap = parseFloat(getComputedStyle(board).columnGap) || 0
      if (!board.classList.contains('is-compact')) {
        const text = board.querySelector('.hero-card__text')
        // + the card's 1px frame above and below
        if (text) textHeightRef.current = text.offsetHeight + 2
      }
      const next = bestFit({
        width: area.clientWidth,
        height: area.clientHeight,
        count,
        gap,
        textHeight: textHeightRef.current ?? 60,
        preferredCols,
      })
      setFit((prev) =>
        prev && prev.cols === next.cols && prev.boardWidth === next.boardWidth && prev.compact === next.compact && prev.overflows === next.overflows
          ? prev
          : next,
      )
    })
    observer.observe(area)
    return () => observer.disconnect()
  }, [count, preferredCols])

  return { areaRef, boardRef, fit }
}
