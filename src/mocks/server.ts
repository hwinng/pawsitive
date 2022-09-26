// from https://github.com/mswjs/examples/blob/master/examples/with-jest/src/mocks/server.js
import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = setupServer(...handlers)
beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({ method, url }) => {
      if (!url.pathname.startsWith('/api')) {
        throw new Error(`Unhandled ${method} request to ${url}`)
      }
    },
  })
)
