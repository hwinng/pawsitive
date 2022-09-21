import type { Table } from 'dexie'
import Dexie from 'dexie'

export interface OwnerModel {
  id: string
  firstName: string
  lastName: string
  email: string
  name: string
  phoneNumber: string
}

export interface PetModel {
  id: string
  name: string
  type: string
  breed: string
  size: string
  owner: string
}
export class MySubClassedDexie extends Dexie {
  pet!: Table<PetModel>
  owner!: Table<OwnerModel>

  constructor() {
    super('myDatabase')
    this.version(2).stores({
      owner: '++id, firstName, lastName, email, name, phoneNumber',
      pet: '&id, name, type, breed, size, owner',
    })
  }
}

export const dexieDb = new MySubClassedDexie()
