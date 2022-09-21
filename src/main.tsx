import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    .then(() => {
      root.render(<AppWrapper />)
    })
} else {
  root.render(<AppWrapper />)
}
