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

export type { Pet, HttpError }
