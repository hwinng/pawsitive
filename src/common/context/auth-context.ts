import React from 'react'

import type { HttpError, ReducerAction } from '../types/types'

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

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  userId: null,
  error: null,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export { useAuth }
