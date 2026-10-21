import { useState } from 'react'
import GameScreen from './components/GameScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import LoadScreen from './components/LoadScreen.jsx'
import { getMode } from './state/modes.js'
import { useGame } from './state/useGame.js'
import { useHeroes } from './state/useHeroes.js'

function App() {
  // Starts loading heroes in the background while the player is on the home screen.
  const heroes = useHeroes()
  const { game, bestScore, start, pick, quit } = useGame()
  // A mode picked before the heroes arrived; the game starts as soon as they do.
  const [pendingModeId, setPendingModeId] = useState(null)

  if (pendingModeId && heroes.status === 'ready') {
    setPendingModeId(null)
    start(getMode(pendingModeId), heroes.heroes)
  }

  function selectMode(modeId) {
    if (heroes.status === 'ready') start(getMode(modeId), heroes.heroes)
    else setPendingModeId(modeId)
  }

  if (game) {
    return <GameScreen game={game} bestScore={bestScore} onPick={pick} onQuit={quit} />
  }

  if (pendingModeId) {
    return <LoadScreen status={heroes.status} onRetry={heroes.retry} onBack={() => setPendingModeId(null)} />
  }

  return <HomeScreen bestScore={bestScore} onSelectMode={selectMode} />
}

export default App
