import { HttpMethod } from 'types/enum'
import type { ClientHttpConfig } from 'types/types'

import { syncLocalStorage } from './syncLocalStorage'

async function client(
  endpoint: string,
  configs: ClientHttpConfig = {
    method: HttpMethod.GET,
  },
  ...extraConfig: any
) {
  const auth = syncLocalStorage('auth')
  const token = auth?.token
  const config = {
    method: configs.method,
    body:
      configs.method === HttpMethod.POST || configs.method === HttpMethod.PUT
        ? JSON.stringify(configs.data)
        : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': configs.data ? 'application/json' : undefined,
      ...configs.customHeaders,
    },
    ...extraConfig,
  }

  return window.fetch(endpoint, config).then(async (response) => {
    if (!syncLocalStorage('auth')) {
      window.location.assign(window.location.toString())
      return Promise.reject({ message: 'Please re-authenticate.' })
    }

    let data: any
    try {
      data = await response.json()
      if (response.ok) {
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        }
      }
      throw new Error(response.statusText)
    } catch (err: any) {
      return Promise.reject(err.message ? err.message : data)
    }
  })
}

export { client }
