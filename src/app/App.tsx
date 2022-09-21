import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { PetAdd, PetEdit } from '../features/pet'
import dataSeedingHelper from '../util/seedingHelper'

export default function App() {
  // const [seedingFinished, setSeedingFinished] = React.useState(false)
  React.useEffect(() => {
    initSampleData()
  }, [])

  async function initSampleData() {
    await dataSeedingHelper()
  }

  return (
    <main data-testid="App">
      <BrowserRouter>
        <Routes>
          <Route path="/pet/*" element={<PetPage />} />
          <Route path="/owner/*" element={<OwnerPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

function PetPage() {
  return (
    <div>
      <nav>
        <div>List page</div>
        <Link to="edit">Go to edit page</Link>
        <br />
        <Link to="add">Go to add page</Link>
      </nav>

      <Routes>
        <Route path="add" element={<PetAdd />} />
        <Route path="edit" element={<PetEdit />} />
      </Routes>
    </div>
  )
}

function OwnerPage() {
  return (
    <div>
      <nav>
        <Link to="/owner/list">Owner page</Link>
      </nav>
    </div>
  )
}
