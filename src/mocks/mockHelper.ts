import { faker } from '@faker-js/faker'
import seedrandom from 'seedrandom'

import {
  petTypes,
  petNames,
  catBreeds,
  dogBreeds,
  petSizes,
} from '../constants/pet'
import type { OwnerMswFactory } from '../types/common'
import { PetType } from '../types/common'

/**
 * Set up a seeded random number generator, so that we get
 * a consistent set of entries each time the page loads.
 * This can be reset by deleting this localStorage value,
 * or turned off by setting `useSeededRNG` to false
 * */
let useSeededRNG = true
/* RNG setup */
let rng = seedrandom()
if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    randomSeedString &&
      localStorage.setItem('randomTimestampSeed', randomSeedString)
  }
  rng = seedrandom(randomSeedString)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array: Array<any>) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}
// Utility function for creating a fake owner data object
const createOwnerData = () => {
  const firstName = String(faker.name.firstName('male'))
  const lastName = String(faker.name.lastName('male'))
  const email = String(faker.internet.email(firstName, lastName, 'gotitapp'))
  const phoneNumber = String(faker.phone.number())
  return Promise.resolve({
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
  })
}

// Utility function for creating a fake pet data object
const createPetData = async (owner: OwnerMswFactory) => {
  let type = randomFromArray(petTypes)
  let image: string
  if (type === String(PetType.CAT)) {
    image = await randomPetImage('cat')
  } else {
    image = await randomPetImage('dog')
  }
  return {
    name: randomFromArray(petNames),
    type,
    breed:
      type === String(PetType.CAT)
        ? randomFromArray(catBreeds)
        : randomFromArray(dogBreeds),
    size: randomFromArray(petSizes),
    image,
    owner,
  }
}

// Utility function for serializing owner id in mock response
const serializePet = (pet: any) => ({
  ...pet,
  owner: pet.owner.id,
})

const randomPetImage = async (
  key: string,
  options: {
    width: number
    height: number
  } = {
    width: 320,
    height: 240,
  }
) => {
  const res = await fetch(
    `https://loremflickr.com/${options.width}/${options.height}/${key}`
  )
  if (!res.ok) {
    return ''
  }
  return res.url
}

export { serializePet, createOwnerData, createPetData, randomPetImage }
