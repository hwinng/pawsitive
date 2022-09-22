import sign from 'jwt-encode'
import isEmpty from 'lodash/isEmpty'
import { rest } from 'msw'

import { dexieDb as db } from '../../db'
import type { OwnerDexieModel, PetDexieModel } from '../types/common'

import { errorJson, successJson } from './mockHelper'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000
// should store in env or somewhere like a stash
const SECRET = 'secret'

// AUTH APIs
const authHandlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { username, firstName } = await req.json()
    const data = {
      name: {
        username,
        firstName,
      },
      iat: Date.now(),
    }
    const jwt = sign(data, SECRET)
    const auth: { username: string; firstName: string; token: string } = {
      username,
      firstName,
      token: jwt,
    }
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(successJson(auth)))
  }),
]

// PET APIs
const petHandlers = [
  rest.get('/api/pets', async function (req, res, ctx) {
    const pets = await db.pet.toArray()
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(pets))
    )
  }),

  rest.post('/api/pet', async function (req, res, ctx) {
    const data: PetDexieModel = await req.json()
    try {
      await db.pet.add(data)
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(successJson(data))
      )
    } catch (error: any) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(409),
        ctx.json(errorJson(error.inner.message))
      )
    }
  }),

  rest.get('/api/pet/:petId', async function (req, res, ctx) {
    const pet: PetDexieModel | undefined = await db.pet.get(req.params.petId)
    if (!pet) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(successJson(null))
      )
    }
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(pet))
    )
  }),

  rest.put('/api/pet/:petId', async (req, res, ctx) => {
    const updatedBody: Partial<PetDexieModel> = await req.json()
    if (isEmpty(updatedBody)) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.json(errorJson('Provide empty body'))
      )
    }
    const updateStatus: number = await db.pet.update(req.params.petId, {
      ...updatedBody,
    })
    if (updateStatus === 0) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(409),
        ctx.json(
          errorJson(
            'The provided key was not found, or the provided data was identical to existing data.'
          )
        )
      )
    }
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(updatedBody))
    )
  }),

  rest.delete('/api/pet/:petId', async (req, res, ctx) => {
    try {
      await db.pet.delete(req.params.petId)
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(successJson(req.params.petId))
      )
    } catch (error) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(errorJson('the provided key is not a valid key'))
      )
    }
  }),
]

// OWNER APIs
const ownerHandlers = [
  rest.get('/api/owners', async function (req, res, ctx) {
    const owners = await db.owner.toArray()
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(owners))
    )
  }),

  rest.post('/api/owner', async function (req, res, ctx) {
    const data: OwnerDexieModel = await req.json()
    try {
      await db.owner.add(data)
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(successJson(data))
      )
    } catch (error: any) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(409),
        ctx.json(errorJson(error.inner.message))
      )
    }
  }),

  rest.get('/api/owner/:ownerId', async function (req, res, ctx) {
    const owner: OwnerDexieModel | undefined = await db.owner.get(
      req.params.ownerId
    )
    if (!owner) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(200),
        ctx.json(successJson(null))
      )
    }
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(owner))
    )
  }),

  rest.put('/api/owner/:ownerId', async (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedBody: Partial<OwnerDexieModel> = await req.json()
    if (isEmpty(updatedBody)) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.json(errorJson('Provide empty body'))
      )
    }
    const updateStatus: number = await db.owner.update(req.params.ownerId, {
      ...updatedBody,
    })
    if (updateStatus === 0) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(409),
        ctx.json(
          errorJson(
            'The provided key was not found, or the provided data was identical to existing data.'
          )
        )
      )
    }
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(successJson(updatedBody))
    )
  }),
]

export const handlers = [...authHandlers, ...ownerHandlers, ...petHandlers]
