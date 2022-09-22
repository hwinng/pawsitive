import React from 'react'

import { useAuth } from '../../hooks/useAuth'

const UnAuthenticatedApp = () => {
  const { login } = useAuth()

  const handleLogin = async () => {
    await login({ username: 'Phillip', firstName: 'Huyen Nguyen' })
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default UnAuthenticatedApp
