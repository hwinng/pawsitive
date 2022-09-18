import type { PetType, PetSize } from './enums'

type Pet = {
  ownerId: string
  name: number
  type: PetType
  breed: string
  size: PetSize
  image: string
}

type HttpError = {
  code?: number
  message: string
}

type DeferredPromise<DeferType> = {
  resolve: (value: DeferType) => void
  reject: (value: unknown) => void
  promise: Promise<DeferType>
}

type ReducerAction<T, K> = {
  type: T
  payload: K
}

export type { Pet, HttpError, DeferredPromise, ReducerAction }
