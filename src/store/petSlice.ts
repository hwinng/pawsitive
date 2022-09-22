import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { Status, PetType, PetSize } from '../types/enum'
import type { HttpError } from '../types/types'

import type { RootState } from './index'

// Define a type for the slice state
interface Pet {
  pet: null | Pet
  pets: [] | Partial<Pet>[]
  status: Status
  error: null | HttpError
}

// Define the initial state using that type
const initialState: Pet = {
  error: null,
  pet: null,
  pets: [],
  status: Status.IDLE,
}

const petEntity = new schema.Entity('pets')

export const fetchPets = createAsyncThunk('pet/fetchAll', async () => {
  const response = await Promise.resolve({
    data: [
      {
        ownerId: 'asdjasd',
        name: 'Ally',
        type: PetType.DOG,
        breed: 'Beagle',
        size: PetSize.MEDIUM,
      },
    ],
  })
  // Normalize the data before passing it to our reducer
  const normalized = normalize(response.data, [petEntity])
  return normalized.entities
})

export const petSlice = createSlice({
  initialState,
  name: 'pet',
  reducers: {
    loadPets: (state, action: PayloadAction<Partial<Pet>[]>) => {
      state.pets = action.payload || []
    },
  },
})

// Extract and export each action creator by name
export const { loadPets } = petSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPet = (state: RootState) => state.pet

// Export the reducer, either as a default or named export
export default petSlice.reducer
