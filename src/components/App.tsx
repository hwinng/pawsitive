import React from 'react'

import dataSeedingHelper from '../utils/seedingHelper'

import AuthenticatedApp from './Authenticated/AuthenticatedApp'
import UnAuthenticatedApp from './Unauthenticated/UnAuthenticatedApp'

export default function App() {
  const [isAuthenticated] = React.useState(false)

  React.useEffect(() => {
    initSampleData()
  }, [])

  async function initSampleData() {
    await dataSeedingHelper()
  }

  if (isAuthenticated) {
    return <AuthenticatedApp />
  }

  return <UnAuthenticatedApp />
}
