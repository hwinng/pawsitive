import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { ErrorFallback } from '../Layout/ErrorFallback'
import { FullPageErrorFallback } from '../Layout/FullPageErrorFallback'
import NavHeader from '../Layout/NavHeader'

import PetDetail from './Pet/PetDetail'
import PetList from './Pet/PetList'

const AuthenticatedApp = () => {
  const { auth, logout } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      {auth && <NavHeader userInfo={auth} logout={logout} />}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route index={false} path="/pets" element={<PetList />} />
      <Route path="/pet/:petId" element={<PetDetail />} />
      <Route path="/owners" element={<div>OWNER LIST PAGE</div>} />
      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  )
}
export default AuthenticatedApp
