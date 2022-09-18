import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { Status } from '../../constants/enums'
import type { HttpError } from '../../constants/types'

// Define a type for the slice state
interface Auth {
  username: undefined | string
  token: undefined | string
  error: null | HttpError
  status: Status
}

// Define the initial state using that type
const initialState: Auth = {
  username: '',
  token: '',
  error: null,
  status: Status.IDLE,
}

export const checkAuthen = createAsyncThunk('auth/login', async () => {
  const response = await Promise.resolve()
  return response
})

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loginRequest: (state) => {
      state.status = Status.PENDING
    },
    loginSuccess: (state, action: PayloadAction<Partial<Auth>>) => {
      state.status = Status.RESOLVED
      state.username = action.payload.username
      state.token = action.payload.token
    },
    loginFailed: (state, action: PayloadAction<Pick<Auth, 'error'>>) => {
      state.status = Status.REJECTED
      state.error = action.payload.error
    },
  },
})

// Extract and export each action creator by name
export const { loginRequest, loginSuccess, loginFailed } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

// Export the reducer, either as a default or named export
export default authSlice.reducer
