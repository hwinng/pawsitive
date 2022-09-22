import React from 'react'
import { useAuth } from '../hooks/useAuth'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './Authenticated')
)
const UnauthenticatedApp = React.lazy(() => import('./Unauthenticated'))

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <React.Suspense fallback={<div>Full page spinner...</div>}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
