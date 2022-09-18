import React from 'react'
import './App.css'

const body = {
  username: 'Phillip',
}

const App: React.FC = () => {
  function handleRegister() {
    window
      .fetch('/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(async (response) => {
        const data = await response.json()
        console.log({ data })
      })
  }

  return (
    <main data-testid="App" className="App">
      <button onClick={handleRegister}>Register</button>
    </main>
  )
}

export default App
