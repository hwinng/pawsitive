import React from 'react'

import { useAuth } from '../hooks/useAuth'

import { FullPageSpinner } from './Layout/FullPageSpinner'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './Authenticated')
)
const UnauthenticatedApp = React.lazy(() => import('./Unauthenticated'))

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
