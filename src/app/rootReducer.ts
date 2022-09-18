import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import petReducer from '../features/pet/petSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  pet: petReducer,
})

export default rootReducer
