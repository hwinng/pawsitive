import { nanoid } from '@reduxjs/toolkit'
import { rest } from 'msw'

import type { LoginBody, LoginResponse } from '../src/common/types/types'

import { db, serializePet } from './seeding'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

// AUTH APIs
const authHandlers = [
  rest.post<LoginBody, LoginResponse>('/login', async (req, res, ctx) => {
    const { username } = await req.json()
    const auth = {
      username,
      firstName: 'Phillip',
      token: nanoid(),
    }
    localStorage.setItem('auth', JSON.stringify(auth))
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json({
        username,
        firstName: 'Phillip',
      })
    )
  }),
  rest.get('/whoisme', (req, res, ctx) => {
    const authString = localStorage.getItem('auth')
    if (!authString) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(401),
        ctx.json({
          data: {
            message: 'Not authenticated',
          },
        })
      )
    }
    const auth = JSON.parse(authString)
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json({
        data: {
          token: auth.token,
        },
      })
    )
  }),
  rest.post('/logout', (req, res, ctx) => {
    const authString = localStorage.getItem('auth')
    if (authString) {
      localStorage.removeItem('auth')
    }
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json({
        data: 'Logout successfully',
      })
    )
  }),
]

// PET APIs
const petHandlers = [
  rest.get('/api/pets', function (req, res, ctx) {
    const pets = db.pet.getAll().map(serializePet)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(pets))
  }),
  rest.post('/api/pet', async function (req, res, ctx) {
    const data = await req.json()

    if (data.content === 'error') {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error saving this post!')
      )
    }
    // data.date = new Date().toISOString()
    const owner = db.owner.findFirst({ where: { id: { equals: data.owner } } })
    data.owner = owner

    const pet = db.pet.create(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePet(pet)))
  }),
  rest.get('/api/pet/:petId', function (req, res, ctx) {
    const pet = db.pet.findFirst({
      where: { id: { equals: String(req.params.petId) } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePet(pet)))
  }),
  rest.patch('/api/pet/:petId', async (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = await req.json()
    const updatedPet = db.pet.update({
      where: { id: { equals: String(req.params.petId) } },
      data,
    })
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json(serializePet(updatedPet))
    )
  }),
]

// OWNER APIs
const ownerHandlers = [
  rest.get('/api/owners', function (req, res, ctx) {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.owner.getAll()))
  }),
  rest.post('/api/owner', async function (req, res, ctx) {
    const data = await req.json()
    if (data.content === 'error') {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error saving this post!')
      )
    }
    const owner = db.owner.create(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(owner))
  }),
  rest.get('/api/owner/:ownerId', function (req, res, ctx) {
    const owner = db.owner.findFirst({
      where: { id: { equals: String(req.params.ownerId) } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(owner))
  }),
  rest.patch('/api/owner/:ownerId', async (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = await req.json()
    const updatedOwner = db.owner.update({
      where: { id: { equals: String(req.params.ownerId) } },
      data,
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(updatedOwner))
  }),
]

export const handlers = [...authHandlers, ...ownerHandlers, ...petHandlers]
