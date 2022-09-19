import { factory, oneOf, primaryKey, nullable } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import seedrandom from 'seedrandom'

import { PetSize, PetType } from '../src/common/types/enums'

// Number of owners and pets seeding config
const NO_OWNERS = 5
const PETS_PER_OWNER = 1

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
const db = factory({
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
  const lastName = faker.name.lastName('male')
  const email = faker.internet.email(firstName, lastName, 'gotitapp')
  const phoneNumber = faker.phone.phoneNumber()
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

// Create an initial set of owners and pets
for (let i = 0; i < NO_OWNERS; i++) {
  const owner = db.owner.create(createOwnerData())
  for (let j = 0; j < PETS_PER_OWNER; j++) {
    const newPet = createPetData(owner)
    db.pet.create(newPet)
  }
}

// Utility function for serializing owner id in mock response
const serializePet = (pet) => ({
  ...pet,
  owner: pet.owner.id,
})

export { db, serializePet }
