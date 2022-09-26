import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { Status } from 'types/enum'
import type { OwnerDexieModel } from 'types/types'
import { client } from 'utils/clientApi'

import type { RootState } from './index'

const ownersAdapter = createEntityAdapter({
  sortComparer: (a: OwnerDexieModel, b: OwnerDexieModel) =>
    b.name.localeCompare(a.name),
})

const initialState = ownersAdapter.getInitialState<{
  status: Status
  error: string | undefined
}>({
  status: Status.IDLE,
  error: undefined,
})

export const fetchOwners = createAsyncThunk('owner/fetchAll', async () => {
  const response = await client('/api/owners')
  return response.data
})

export const fetchOwnerDetail = createAsyncThunk(
  'owner/fetchOwnerDetail',
  async (ownerId: string) => {
    const response = await client(`/api/owner/${ownerId}`)
    return response.data
  }
)

export const ownerSlice = createSlice({
  initialState,
  name: 'owner',
  reducers: {},
  extraReducers(builder) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchOwners.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchOwners.fulfilled, (state, action) => {
      state.status = Status.RESOLVED
      ownersAdapter.upsertMany(state, action.payload)
    })
    builder.addCase(fetchOwners.rejected, (state, action) => {
      state.status = Status.REJECTED
      state.error = action.error.message
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchOwnerDetail.pending, (state, action) => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchOwnerDetail.fulfilled, (state, action) => {
      state.status = Status.RESOLVED
      ownersAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(fetchOwnerDetail.rejected, (state, action) => {
      state.status = Status.REJECTED
      state.error = action.error.message
    })
  },
})

export const selectOwner = (state: RootState) => state.owner
export const { selectAll: selectAllOwners, selectById: selectOwnerById } =
  ownersAdapter.getSelectors((state: RootState) => state.owner)
export default ownerSlice.reducer
