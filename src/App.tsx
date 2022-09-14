import React, { useEffect, useState } from 'react'

import './index.css'
import './App.css'

const App: React.FC = () => {

  // useEffect(() => {
  //   fetch('./docs_list')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.info({data})
  //       setDocsList(data)
  //     })
  //     .catch()
  // }, [])

  return (
    <main data-testid="App" className="App">
      Pet Mart
    </main>
  )
}

export default App
