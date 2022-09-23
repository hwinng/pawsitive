import type { PetType, PetSize, HttpMethod } from './enum'

interface LoginFormVm {
  username: string
  firstName: string
  password: string
}

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

type PetMswFactory = {
  id: string
  name: string
  type: string
  breed: string
  size: string
  image?: string
  owner: OwnerMswFactory
}

type OwnerMswFactory = {
  id: string
  firstName: string
  lastName: string
  email: string
  name: string
  phoneNumber: string
}

type ClientHttpConfig = {
  method?: HttpMethod
  data?: any
  token?: string
  customHeaders?: any
}

type MediaQueryString =
  | '(min-width: 768px)'
  | '(min-width: 1024px)'
  | '(min-width: 1440px)'

interface OwnerDexieModel {
  id: string
  firstName: string
  lastName: string
  email: string
  name: string
  phoneNumber: string
}

interface PetDexieModel {
  id: string
  name: string
  type: string
  breed: string
  size: string
  image?: string
  owner: string
}
export type {
  Pet,
  HttpError,
  DeferredPromise,
  ReducerAction,
  LoginFormVm,
  PetMswFactory,
  OwnerMswFactory,
  PetDexieModel,
  OwnerDexieModel,
  ClientHttpConfig,
  MediaQueryString,
}
