import { rest } from 'msw'
import { v4 as uuidv4 } from 'uuid'

const authHandlers = [
  rest.post('/register', async (req, res, ctx) => {
    const reqBody = await req.json()
    const auth = {
      username: reqBody?.username,
      userId: uuidv4(),
    }
    if (reqBody) {
      localStorage.setItem('auth', JSON.stringify(auth))
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            auth,
          },
        })
      )
    }
    return res(
      ctx.status(503),
      ctx.json({
        data: {
          message: 'Something wrongs!',
        },
      })
    )
  }),

  rest.post('/login', (req, res, ctx) => {
    const authString = localStorage.getItem('auth')
    if (!authString) {
      return res(
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
      ctx.status(200),
      ctx.json({
        data: {
          auth,
        },
      })
    )
  }),
  rest.post('/logout', (req, res, ctx) => {
    // check if userId exists in localStorage
    const authString = localStorage.getItem('userId')
    if (authString) {
      localStorage.removeItem('auth')
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: 'Logout successfully',
      })
    )
  }),
]

export const handlers = [...authHandlers]
