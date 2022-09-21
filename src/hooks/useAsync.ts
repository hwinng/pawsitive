import * as React from 'react'

import { Status } from '../types/common'
import type { HttpError } from '../types/common'

interface AsyncState {
  status: Status
  data: null | any
  error: null | HttpError
}

interface AsyncAction {
  type: Status
  payload?: any
}

const defaultInitialState = { status: Status.IDLE, data: null, error: null }

function useSafeDispatch(dispatch: React.Dispatch<AsyncAction>) {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return React.useCallback(
    (args: AsyncAction) => (mounted.current ? dispatch(args) : void 0),
    [dispatch]
  )
}

function asyncReducer(state: AsyncState, action: AsyncAction) {
  switch (action.type) {
    case Status.PENDING: {
      return { status: Status.PENDING, data: null, error: null }
    }
    case Status.RESOLVED: {
      return { status: Status.RESOLVED, data: action.payload, error: null }
    }
    case Status.REJECTED: {
      return { status: Status.REJECTED, data: null, error: action.payload }
    }
    case Status.RESET: {
      return { ...action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(initialState?: { status: Status; data: symbol } | undefined) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [state, unsafeDispatch] = React.useReducer(
    asyncReducer,
    initialStateRef.current
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const { data, error, status } = state

  const setData = React.useCallback(
    (payload: any) => dispatch({ type: Status.RESOLVED, payload }),
    [dispatch]
  )
  const setError = React.useCallback(
    (error: HttpError) => dispatch({ type: Status.REJECTED, payload: error }),
    [dispatch]
  )

  const reset = React.useCallback(
    () => dispatch({ type: Status.RESET, payload: initialStateRef.current }),
    [dispatch]
  )

  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      dispatch({ type: Status.PENDING })
      return promise.then(
        (data: any) => {
          setData(data)
          return data
        },
        (error: HttpError) => {
          setError(error)
          return Promise.reject(error)
        }
      )
    },
    [dispatch, setData, setError]
  )

  return {
    status,
    error,
    data,

    isIdle: status === Status.IDLE,
    isPending: status === Status.PENDING,
    isResolved: status === Status.RESOLVED,
    isRejected: status === Status.REJECTED,

    setData,
    setError,
    run,
    reset,
  }
}

export { useAsync }
