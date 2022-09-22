import type { Table } from 'dexie'
import Dexie from 'dexie'

import type { PetDexieModel, OwnerDexieModel } from '../src/types/types'

export class MySubClassedDexie extends Dexie {
  pet!: Table<PetDexieModel>
  owner!: Table<OwnerDexieModel>

  constructor() {
    super('pawsitive')
    this.version(2).stores({
      owner: '&id, firstName, lastName, email, name, phoneNumber',
      pet: '&id, name, type, breed, size, image, owner',
    })
  }
}

export const dexieDb = new MySubClassedDexie()
