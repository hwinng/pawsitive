import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { ErrorFallback } from '../Layout/ErrorFallback'
import { FullPageErrorFallback } from '../Layout/FullPageErrorFallback'
import NavHeader from '../Layout/NavHeader'

const AuthenticatedApp = () => {
  const { auth } = useAuth()

  // React.useEffect(() => {
  //   client('pets', { method: HttpMethod.GET }).then(console.log)
  // }, [])

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      {auth && <NavHeader userInfo={auth} />}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route index={false} path="/pets" element={<div>PET LIST PAGE</div>} />
      <Route path="/pet/:bookId" element={<div>PET DETAIL PAGE</div>} />
      <Route path="/owners" element={<div>OWNER LIST PAGE</div>} />
      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  )
}
export default AuthenticatedApp
