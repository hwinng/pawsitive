import { nanoid } from '@reduxjs/toolkit'

import { dexieDb } from 'database'
import { createOwnerData, createPetData, serializePet } from 'mocks/mockHelper'
import type { OwnerDexieModel, PetDexieModel } from 'types/types'

import { syncLocalStorage } from './syncLocalStorage'

// eslint-disable-next-line prettier/prettier
async function bootstrapAppData(
  option: { noOwners: number; petPerOwner: number } = {
    noOwners: 5,
    petPerOwner: 2,
  }
) {
  if (syncLocalStorage('seeded')) {
    return
  }
  console.log('seeding data')

  // create owner sample data
  let owners: OwnerDexieModel[] = []
  let pets: PetDexieModel[] = []

  for (let i = 0; i < option.noOwners; i++) {
    let owner = await createOwnerData()
    let ownerWithId = {
      id: nanoid(),
      ...owner,
    }
    owners.push(ownerWithId)
    for (let j = 0; j < option.petPerOwner; j++) {
      let pet = await createPetData(ownerWithId)
      let petWithId = {
        id: nanoid(),
        ...pet,
      }
      pets.push({
        ...serializePet(petWithId),
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
      console.error({ error })
    })

  localStorage.setItem('seeded', JSON.stringify(true))
}

export default bootstrapAppData
