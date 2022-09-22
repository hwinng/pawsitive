import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { useClient, useAuth } from '../../hooks/useAuth'
import { HttpMethod } from '../../types/common'
import { ErrorFallback } from '../Layout/ErrorFallback'
import { FullPageErrorFallback } from '../Layout/FullPageErrorFallback'
import NavHeader from '../Layout/NavHeader'

const AuthenticatedApp = () => {
  const { logout, auth } = useAuth()
  const client = useClient()
  const navigate = useNavigate()

  React.useEffect(() => {
    client('pets', { method: HttpMethod.GET }).then(console.log)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/pets')
  }

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      {auth && <NavHeader userInfo={auth} />}
      <button onClick={handleLogout}>Logout</button>
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
      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  )
}
export default AuthenticatedApp
