import { rest } from 'msw'

import { dexieDb as db } from '../../db'
import type { PetDexieModel } from '../types/common'

import { mswFactory as factory } from './factory'

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

// AUTH APIs
// const authHandlers = [
//   rest.post<LoginBody, LoginResponse>('/login', async (req, res, ctx) => {
//     const { username } = await req.json()
//     const auth = {
//       username,
//       firstName: 'Phillip',
//       token: nanoid(),
//     }
//     localStorage.setItem('auth', JSON.stringify(auth))
//     return res(
//       ctx.delay(ARTIFICIAL_DELAY_MS),
//       ctx.json({
//         username,
//         firstName: 'Phillip',
//       })
//     )
//   }),
//   rest.get('/whoisme', (req, res, ctx) => {
//     const authString = localStorage.getItem('auth')
//     if (!authString) {
//       return res(
//         ctx.delay(ARTIFICIAL_DELAY_MS),
//         ctx.status(401),
//         ctx.json({
//           data: {
//             message: 'Not authenticated',
//           },
//         })
//       )
//     }
//     const auth = JSON.parse(authString)
//     return res(
//       ctx.delay(ARTIFICIAL_DELAY_MS),
//       ctx.json({
//         data: {
//           token: auth.token,
//         },
//       })
//     )
//   }),
//   rest.post('/logout', (req, res, ctx) => {
//     const authString = localStorage.getItem('auth')
//     if (authString) {
//       localStorage.removeItem('auth')
//     }
//     return res(
//       ctx.delay(ARTIFICIAL_DELAY_MS),
//       ctx.json({
//         data: 'Logout successfully',
//       })
//     )
//   }),
// ]

// PET APIs

const petHandlers = [
  rest.get('/api/pets', async function (req, res, ctx) {
    const pets = await db.pet.toArray()
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(pets))
  }),

  rest.post('/api/pet', async function (req, res, ctx) {
    const data: PetDexieModel = await req.json()
    console.log({ data })
    if (!data) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error saving this pet!')
      )
    }
    await db.pet.add(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.status(200), ctx.json(data))
  }),

  rest.get('/api/pet/:petId', async function (req, res, ctx) {
    const pet: PetDexieModel | undefined = await db.pet.get(req.params.petId)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.status(200), ctx.json(pet))
  }),

  rest.patch('/api/pet/:petId', async (req, res, ctx) => {
    const updatedBody: Partial<PetDexieModel> = await req.json()
    if (!updatedBody) {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json('Server error updating this pet!')
      )
    }
    await db.pet.update(req.params.petId, { ...updatedBody })

    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.status(200),
      ctx.json(updatedBody)
    )
  }),
]

// OWNER APIs
const ownerHandlers = [
  rest.get('/api/owners', function (req, res, ctx) {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(factory.owner.getAll()))
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
    const owner = factory.owner.create(data)
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(owner))
  }),
  rest.get('/api/owner/:ownerId', function (req, res, ctx) {
    const owner = factory.owner.findFirst({
      where: { id: { equals: String(req.params.ownerId) } },
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(owner))
  }),
  rest.patch('/api/owner/:ownerId', async (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = await req.json()
    const updatedOwner = factory.owner.update({
      where: { id: { equals: String(req.params.ownerId) } },
      data,
    })
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(updatedOwner))
  }),
]

export const handlers = [...ownerHandlers, ...petHandlers]
