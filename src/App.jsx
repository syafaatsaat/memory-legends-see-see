import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import { useGame } from './state/useGame.js'
import { useHeroes } from './state/useHeroes.js'

function App() {
  // Starts loading heroes in the background while the player is on the home screen.
  useHeroes()
  const { bestScore } = useGame()
  // Selected mode id; the game screen is built in the next step.
  const [, setModeId] = useState(null)

  return <HomeScreen bestScore={bestScore} onSelectMode={setModeId} />
}

export default App
