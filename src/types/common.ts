interface LoginBody {
  username: string
}
interface LoginResponse {
  username: string
  firstName: string
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

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum PetType {
  CAT = 'CAT',
  DOG = 'DOG',
}

enum PetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

enum Status {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  RESET = 'RESET',
}

export { Status, PetSize, PetType, HttpMethod }

export type {
  Pet,
  HttpError,
  DeferredPromise,
  ReducerAction,
  LoginResponse,
  LoginBody,
  PetMswFactory,
  OwnerMswFactory,
  PetDexieModel,
  OwnerDexieModel,
  ClientHttpConfig,
}
