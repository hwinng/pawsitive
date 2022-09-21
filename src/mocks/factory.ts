import { factory, oneOf, primaryKey, nullable } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'

/* MSW Data Model Setup */
const mswFactory = factory({
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

export { mswFactory }
