import { combineReducers } from '@reduxjs/toolkit'

import petReducer from './petSlice'

const rootReducer = combineReducers({
  pet: petReducer,
})

export default rootReducer
