import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { HttpMethod, Status } from '../types/enum'
import type { PetDexieModel } from '../types/types'
import { client } from '../utils/client-api'

import { fetchOwnerDetail } from './ownerSlice'

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
  const response = await client('/api/pets')
  return response.data
})

export const fetchPetDetail = createAsyncThunk(
  'pet/fetPetDetail',
  async (petId: string) => {
    const response = await client(`/api/pet/${petId}`)
    return response.data
  }
)

export const removePet = createAsyncThunk(
  'pet/removePet',
  async (petId: string) => {
    const response = await client(`/api/pet/${petId}`, {
      method: HttpMethod.DELETE,
    })
    return response.data
  }
)

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchPetDetail.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchPetDetail.fulfilled, (state, action) => {
      state.status = Status.RESOLVED
      petsAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(fetchPetDetail.rejected, (state, action) => {
      state.status = Status.REJECTED
      state.error = action.error.message
    })
    builder.addCase(fetchOwnerDetail.fulfilled, (state, action) => {
      petsAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(removePet.fulfilled, (state, action) => {
      petsAdapter.removeOne(state, action.payload)
    })
  },
})

export const {
  selectAll: selectAllPets,
  selectById: selectPetById,
  selectIds: selectPetIds,
} = petsAdapter.getSelectors((state: RootState) => state.pet)
// Export the reducer, either as a default or named export
export default petSlice.reducer
