import { nanoid } from '@reduxjs/toolkit'

import type { OwnerModel, PetModel } from '../../db'
import { dexieDb } from '../../db'
import {
  createOwnerData,
  createPetData,
  serializePet,
} from '../../mocks/seeding'

// eslint-disable-next-line prettier/prettier
export default async function dataSeedingHelper(option: { noOwners: number, petPerOwner: number } = {
    noOwners: 5,
    petPerOwner: 1,
  }
) {
  if (localStorage.getItem('dataSeeded')) {
    return
  }

  // create owner sample data
  let owners: OwnerModel[] = []
  let pets: PetModel[] = []

  for (let i = 0; i < option.noOwners; i++) {
    let owner = createOwnerData()
    let ownerWithId = {
      id: nanoid(),
      ...owner,
    }
    owners.push(ownerWithId)
    for (let j = 0; j < option.petPerOwner; j++) {
      let pet = createPetData(ownerWithId)
      pets.push({
        id: nanoid(),
        ...serializePet(pet),
      })
    }
  }

  await dexieDb
    .transaction('rw', dexieDb.owner, dexieDb.pet, () => {
      dexieDb.owner.bulkAdd(owners)
      dexieDb.pet.bulkAdd(pets)
    })
    .then(() => {})
    .catch((error) => {
      //
      // Transaction Failed
      //
      console.error({ error })
    })

  localStorage.setItem('dataSeeded', JSON.stringify(true))
}
