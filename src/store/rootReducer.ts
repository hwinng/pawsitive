import { combineReducers } from '@reduxjs/toolkit'

import ownerReducer from './ownerSlice'
import petReducer from './petSlice'

const rootReducer = combineReducers({
  pet: petReducer,
  owner: ownerReducer,
})

export default rootReducer
