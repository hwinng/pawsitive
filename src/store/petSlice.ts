import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { Status } from '../types/enum'
import type { PetDexieModel } from '../types/types'
import { client } from '../utils/client-api'

import type { RootState } from './index'

const petsAdapter = createEntityAdapter({
  sortComparer: (a: PetDexieModel, b: PetDexieModel) =>
    b.name.localeCompare(a.name),
})

const initialState = petsAdapter.getInitialState<{
  status: Status
  error: string | undefined
}>({
  status: Status.IDLE,
  error: undefined,
})

export const fetchPets = createAsyncThunk('pet/fetchAll', async () => {
  const response = await client('pets')
  return response.data.data
})

export const petSlice = createSlice({
  initialState,
  name: 'pet',
  reducers: {},
  extraReducers(builder) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchPets.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchPets.fulfilled, (state, action) => {
      state.status = Status.RESOLVED
      petsAdapter.upsertMany(state, action.payload)
    })
    builder.addCase(fetchPets.rejected, (state, action) => {
      state.status = Status.REJECTED
      state.error = action.error.message
    })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectPet = (state: RootState) => state.pet
export const {
  selectAll: selectAllPets,
  selectById: selectPetById,
  selectIds: selectPetIds,
} = petsAdapter.getSelectors((state: RootState) => state.pet)
// Export the reducer, either as a default or named export
export default petSlice.reducer
