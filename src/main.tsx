import React from 'react'
import '@ahaui/css/dist/index.min.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import { AuthProvider } from './hooks/useAuth'
import { store } from './store'
import bootstrapAppData from './utils/seedingHelper'

let container: Element | null = null

// eslint-disable-next-line @typescript-eslint/no-unused-vars
document.addEventListener('DOMContentLoaded', function (event: Event) {
  if (!container) {
    container = document.getElementById('root')
  }
  if (container) {
    if (process.env.NODE_ENV === 'development') {
      const root = createRoot(container)
      import('./mocks/browser')
        .then(({ worker }) => {
          worker.start({
            onUnhandledRequest: 'bypass',
          })
        })
        .then(() => {
          bootstrapAppData()
        })
        .then(() => {
          root.render(
            <React.StrictMode>
              <Provider store={store}>
                <AuthProvider>
                  <Router>
                    <App />
                  </Router>
                </AuthProvider>
              </Provider>
            </React.StrictMode>
          )
        })
    } else {
      // do with production
    }
  }
})
