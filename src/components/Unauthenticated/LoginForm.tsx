import React from 'react'

const LoginForm: React.FC<{
  onSubmit: (body: { username: string; firstName: string }) => Promise<void>
  submitButton: React.ReactElement
}> = () => {
  return (
    <form>
      <button>Login</button>
    </form>
  )
}

export default LoginForm
