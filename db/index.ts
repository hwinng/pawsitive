import type { Table } from 'dexie'
import Dexie from 'dexie'

import type { OwnerDexieModel, PetDexieModel } from '../src/types/common'

export class MySubClassedDexie extends Dexie {
  pet!: Table<PetDexieModel>
  owner!: Table<OwnerDexieModel>

  constructor() {
    super('myDatabase')
    this.version(2).stores({
      owner: '++id, firstName, lastName, email, name, phoneNumber',
      pet: '&id, name, type, breed, size, owner',
    })
  }
}

export const dexieDb = new MySubClassedDexie()
