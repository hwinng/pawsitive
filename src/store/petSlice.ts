import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { HttpMethod, Status } from 'types/enum'
import type { PetDexieModel } from 'types/types'
import { client } from 'utils/clientApi'

import { fetchOwnerDetail } from './ownerSlice'

import type { RootState } from './index'

const petsAdapter = createEntityAdapter({
  sortComparer: (a: PetDexieModel, b: PetDexieModel) =>
    a.name.localeCompare(b.name),
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

export const addNewPet = createAsyncThunk(
  'pet/addNewPet',
  async (pet: PetDexieModel) => {
    const response = await client('/api/pet', {
      method: HttpMethod.POST,
      data: pet,
    })
    return response.data
  }
)

export const updatePet = createAsyncThunk(
  'pet/updatePet',
  async (arg: { petId: string; body: Partial<PetDexieModel> }) => {
    const response = await client(`/api/pet/${arg.petId}`, {
      method: HttpMethod.PUT,
      data: arg.body,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(addNewPet.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(addNewPet.fulfilled, (state, action) => {
      petsAdapter.addOne(state, action.payload)
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(updatePet.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(updatePet.fulfilled, (state, action) => {
      petsAdapter.updateOne(state, action.payload)
    })
  },
})

export const selectPet = (state: RootState) => state.pet
export const {
  selectAll: selectAllPets,
  selectById: selectPetById,
  selectIds: selectPetIds,
} = petsAdapter.getSelectors((state: RootState) => state.pet)
// Export the reducer, either as a default or named export
export default petSlice.reducer
