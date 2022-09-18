import React from 'react'

import type { HttpError, ReducerAction } from '../constants/types'

type AuthState = {
  isAuthenticated: boolean
  username: string | null
  userId: string | null
  error: HttpError | null
}

type AuthDispatch = (action: ReducerAction<AuthActionType, any>) => void

enum AuthActionType {
  LOGIN,
  LOGOUT,
  AUTH_ERROR,
}
const AuthContext = React.createContext<
  | {
      state: AuthState
      dispatch: AuthDispatch
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  userId: null,
  error: null,
}

function authReducer(
  state: AuthState,
  action: ReducerAction<AuthActionType, any>
) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        isAuthenticated: true,
        username: action.payload?.username,
        userId: action.payload?.userId,
      }
    case AuthActionType.LOGOUT: {
      return { ...defaultAuthState }
    }
    case AuthActionType.AUTH_ERROR: {
      return {
        ...defaultAuthState,
        error: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a AuthProvider')
  }
  return context
}

function AuthProvider({children}: React.ReactNode ) {
    return (

    )
}


export { useAuth, authReducer, AuthContext }
