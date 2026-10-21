import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import { loadBestScore } from './state/bestScore.js'

function App() {
  const [bestScore] = useState(loadBestScore)
  // Selected mode id; the game screen is built in the next step.
  const [, setModeId] = useState(null)

  return <HomeScreen bestScore={bestScore} onSelectMode={setModeId} />
}

export default App
