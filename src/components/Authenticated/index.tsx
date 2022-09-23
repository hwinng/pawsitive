import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import Button from '../Common/Button'
import { ErrorFallback } from '../Layout/ErrorFallback'
import { FullPageErrorFallback } from '../Layout/FullPageErrorFallback'
import NavHeader from '../Layout/NavHeader'
import PageHeader from '../Layout/PageHeader'
import PetDetail from './Pet/PetDetail'
import PetList from './Pet/PetList'

const AuthenticatedApp = () => {
  const { auth, logout } = useAuth()

  // React.useEffect(() => {
  //   client('pets', { method: HttpMethod.GET }).then(console.log)
  // }, [])

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      {auth && <NavHeader userInfo={auth} logout={logout} />}
      {auth && (
        <PageHeader title="Pet List">
          <Button variant="secondary" onClick={() => console.log('add')}>
            Add
          </Button>
          <Button variant="primary" onClick={() => console.log('edit')}>
            edit
          </Button>
        </PageHeader>
      )}
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
      <Route path="/pet/:bookId" element={<PetDetail />} />
      <Route path="/owners" element={<div>OWNER LIST PAGE</div>} />
      <Route path="*" element={<Navigate to="/pets" replace />} />
    </Routes>
  )
}
export default AuthenticatedApp
