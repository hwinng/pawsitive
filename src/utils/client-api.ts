import type { ClientHttpConfig } from '../types/common'
import { HttpMethod } from '../types/common'

import { syncLocalStorage } from './syncLocalStorage'

async function client(
  endpoint: string,
  configs: ClientHttpConfig = {},
  ...extraConfig: any
) {
  const config = {
    method: configs.method,
    body:
      configs.method === (HttpMethod.POST || HttpMethod.PUT)
        ? JSON.stringify(configs.data)
        : undefined,
    headers: {
      Authorization: configs.token ? `Bearer ${configs.token}` : undefined,
      'Content-Type': configs.data ? 'application/json' : undefined,
      ...configs.customHeaders,
    },
    ...extraConfig,
  }

  return window.fetch(`api/${endpoint}`, config).then(async (response) => {
    if (!syncLocalStorage('auth')) {
      window.location.assign(window.location.toString())
      return Promise.reject({ message: 'Please re-authenticate.' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client }
