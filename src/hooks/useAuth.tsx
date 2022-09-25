import React from 'react'
import { ErrorFallback } from '../components/Layout/ErrorFallback'

import { FullPageSpinner } from '../components/Layout/FullPageSpinner'
import { useAsync } from '../hooks/useAsync'
import { HttpMethod } from '../types/enum'
import type { ClientHttpConfig } from '../types/types'
import { client } from '../utils/client-api'
import { syncLocalStorage } from '../utils/syncLocalStorage'

export type AuthState = {
  username: string
  firstName: string
  token: string
}
type AuthContextProps = {
  auth: AuthState | null
  isAuthenticated: boolean
  login: (body: {
    username: string
    firstName: string
    password: string
  }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    data: _auth,
    status,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    isPending,
    isIdle,
    isRejected,
    isResolved,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const authInStorage = syncLocalStorage('auth')
    if (authInStorage) {
      setData(authInStorage)
    } else {
      setData(null)
    }
  }, [])

  const login = React.useCallback(
    async (body: { username: string; firstName: string; password: string }) => {
      const config = {
        method: HttpMethod.POST,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const p = await fetch('/api/login', config)
      run(p.json()).then(({ data }: any) => {
        setData(data)
        syncLocalStorage('auth', { method: 'serialize', data: data })
      })
    },
    [setData]
  )

  const logout = React.useCallback(async () => {
    localStorage.removeItem('auth')
    run(Promise.resolve(null)).then(() => {
      setData(null)
    })
  }, [setData])

  const value = React.useMemo(
    () => ({
      auth: _auth,
      login,
      logout,
      isAuthenticated: _auth?.token ? true : false,
    }),
    [login, logout, _auth]
  )

  if (isPending || isIdle) {
    return <FullPageSpinner />
  }

  if (isRejected) {
    return ErrorFallback
  }

  if (isResolved) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

function useClient() {
  const auth = syncLocalStorage('auth')
  const token = auth?.token
  return React.useCallback(
    (endpoint: string, config: ClientHttpConfig) => {
      return client(endpoint, { ...config, token })
    },
    [token]
  )
}

export { useAuth, AuthProvider, useClient }
