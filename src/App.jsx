import { useState } from 'react'
import DefeatScreen from './components/DefeatScreen.jsx'
import EndlessOverScreen from './components/EndlessOverScreen.jsx'
import GameScreen from './components/GameScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import LoadScreen from './components/LoadScreen.jsx'
import VictoryScreen from './components/VictoryScreen.jsx'
import { getMode } from './state/modes.js'
import { useGame } from './state/useGame.js'
import { useHeroes } from './state/useHeroes.js'

function App() {
  // Starts loading heroes in the background while the player is on the home screen.
  const heroes = useHeroes()
  const { game, bestScore, previousBest, isNewRecord, start, pick, quit } = useGame()
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
    const resultProps = { game, onPlayAgain: () => start(game.mode, heroes.heroes), onChangeMode: quit }

    if (game.status === 'won') return <VictoryScreen {...resultProps} />
    if (game.status === 'lost' && game.mode.id === 'endless') {
      return <EndlessOverScreen {...resultProps} bestScore={bestScore} previousBest={previousBest} isNewRecord={isNewRecord} />
    }
    if (game.status === 'lost') return <DefeatScreen {...resultProps} />
    return <GameScreen game={game} bestScore={bestScore} onPick={pick} onQuit={quit} />
  }

  if (pendingModeId) {
    return <LoadScreen status={heroes.status} onRetry={heroes.retry} onBack={() => setPendingModeId(null)} />
  }

  return <HomeScreen bestScore={bestScore} onSelectMode={selectMode} />
}

export default App
