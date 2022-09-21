import { factory, oneOf, primaryKey, nullable } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import seedrandom from 'seedrandom'

import { PetSize, PetType } from '../src/common/types/enums'

// Pet constant values
const petNames = [
  'Charlie',
  'Scout',
  'Rocky',
  'Toby',
  'Piper',
  'Vanilla',
  'Daisy',
  'Snow',
  'Cotton',
  'Dusty',
  'Max',
  'Milo',
  'Buddy',
  'Bear',
  'Leo',
  'Duke',
  'Teddy',
  'Tucker',
]
const petTypes = Object.values(PetType)
const petSizes = Object.values(PetSize)
const dogBreeds = [
  'Pointer',
  'Pitbull',
  'Pug',
  'Shiba Inu',
  'Toy Puddle',
  'Chihuahua',
]
const catBreeds = [
  'British',
  'Persian',
  'Sphynx',
  'Scotish Fold',
  'Bengal',
  'Ragdoll',
]

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

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

/* MSW Data Model Setup */
const mswdb = factory({
  owner: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    email: String,
    name: String,
    phoneNumber: String,
  },
  pet: {
    id: primaryKey(nanoid),
    name: String,
    type: String,
    breed: String,
    size: String,
    image: nullable(String),
    owner: oneOf('owner'),
  },
})

// Utility function for creating a fake owner data object
const createOwnerData = () => {
  const firstName = String(faker.name.firstName('male'))
  const lastName = String(faker.name.lastName('male'))
  const email = String(faker.internet.email(firstName, lastName, 'gotitapp'))
  const phoneNumber = String(faker.phone.phoneNumber())
  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
  }
}

// Utility function for creating a fake pet data object
const createPetData = (owner) => {
  let type = randomFromArray(petTypes)
  return {
    name: randomFromArray(petNames),
    type,
    breed:
      type === String(PetType.CAT)
        ? randomFromArray(catBreeds)
        : randomFromArray(dogBreeds),
    size: randomFromArray(petSizes),
    image: null,
    owner,
  }
}

// Utility function for serializing owner id in mock response
const serializePet = (pet) => ({
  ...pet,
  owner: pet.owner.id,
})

export { mswdb, serializePet, mswDataSeeding, createOwnerData, createPetData }
