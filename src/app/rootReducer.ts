import { combineReducers } from '@reduxjs/toolkit'

import petReducer from '../features/pet/petSlice'

const rootReducer = combineReducers({
  pet: petReducer,
})

export default rootReducer
