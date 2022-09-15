import React from 'react'
import './App.css'

import { useAppSelector } from './redux-hook'

const App: React.FC = () => {
  const pet = useAppSelector((state) => state.pet)
  console.log({ pet })
  return (
    <main data-testid="App" className="App">
      Pet Mart
    </main>
  )
}

export default App
