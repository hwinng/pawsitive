/* eslint-disable prettier/prettier */
import { renderHook, act } from '@testing-library/react'

import { useAsync } from '../../hooks/useAsync'
import type { DeferredPromise, HttpError } from '../../types/common';
import { Status } from '../../types/common'

let errorLog: jest.SpyInstance

beforeEach(() => {
  errorLog = jest.spyOn(console, 'error')
})

afterEach(() => {
  errorLog.mockRestore()
})

function deferred() {
  const deferred = {} as DeferredPromise<unknown>

  const promise = new Promise<unknown>((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  deferred.promise = promise
  return deferred
}

const defaultState = {
  status: Status.IDLE,
  data: null,
  error: null,

  isIdle: true,
  isPending: false,
  isRejected: false,
  isResolved: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
}

const pendingState = {
  ...defaultState,
  status: Status.PENDING,
  isIdle: false,
  isPending: true,
}

const resolvedState = {
  ...defaultState,
  status: Status.RESOLVED,
  isIdle: false,
  isResolved: true,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rejectedState = {
  ...defaultState,
  status: Status.REJECTED,
  isIdle: false,
  isRejected: true,
}

test('calling run with a promise which resolves', async () => {
  const { promise, resolve } = deferred()
  const { result } = renderHook(() => useAsync())

  expect(result.current).toEqual(defaultState)
  let p: Promise<unknown>
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(pendingState)
  const resolvedValue = Symbol('resolved value')
  await act(async () => {
    resolve(resolvedValue)
    await p
  })
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  })

  act(() => {
    result.current.reset()
  })
  expect(result.current).toEqual(defaultState)
})

test('calling run with a promise which rejects', async () => {
  const { promise, reject } = deferred()
  const { result } = renderHook(() => useAsync())

  expect(result.current).toEqual(defaultState)

  let p: Promise<unknown>
  act(() => {
    p = result.current.run(promise)
  })
  expect(result.current).toEqual(pendingState)

  const rejectedValue = Symbol('rejected value')
  await act(async () => {
    reject(rejectedValue)
    p.catch(() => {
      /**ignored */
    })
  })
  expect(result.current).toEqual({ ...rejectedState, error: rejectedValue })
})

test('can specify an initial state', () => {
  const mockData = Symbol('resolved value')
  const customInitialState = { status: Status.RESOLVED, data: mockData }
  const { result } = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    ...resolvedState,
    ...customInitialState,
  })
})

test('can set the data', () => {
  const mockData = Symbol('resolved value')
  const { result } = renderHook(() => useAsync())
  act(() => {
    result.current.setData(mockData)
  })
  expect(result.current).toEqual({
    ...resolvedState,
    data: mockData,
  })
})

test('can set the error', () => {
  const mockError: HttpError = {
    message: 'There was some unexpected errros. Try to refresh the page!',
  }
  const { result } = renderHook(() => useAsync())
  act(() => {
    result.current.setError(mockError)
  })
  expect(result.current).toEqual({
    ...rejectedState,
    error: mockError,
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const { promise, resolve } = deferred()
  const { result, unmount } = renderHook(() => useAsync())
  let p: Promise<unknown>
  act(() => {
    p = result.current.run(promise)
  })
  unmount()
  await act(async () => {
    resolve('')
    await p
  })
  expect(console.error).not.toHaveBeenCalled()
})
