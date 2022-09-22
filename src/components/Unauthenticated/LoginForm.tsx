import { Form } from '@ahaui/react'
import React from 'react'
import styled from 'styled-components'

import { useAsync } from '../../hooks/useAsync'
import ErrorMessage from '../Common/ErrorMessage'
import Spinner from '../Common/Spinner'

const WelcomePageWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
const LoginBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const LoginForm: React.FC<{
  onSubmit: (body: {
    username: string
    firstName: string
    password: string
  }) => Promise<void>
  submitButton: React.ReactElement
}> = ({ submitButton, onSubmit }) => {
  const { isPending, isRejected, error, run } = useAsync()

  function handleSubmit(event: any) {
    event.preventDefault()
    const elements: any = event.target
    run(
      onSubmit({
        username: elements.username.value,
        firstName: elements.firstName.value,
        password: elements.password.value,
      })
    )
  }

  return (
    <WelcomePageWrapper onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Input type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Input type="text" placeholder="Enter first name" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Input type="password" placeholder="Enter password" />
      </Form.Group>

      <LoginBtnWrapper>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isPending ? <Spinner style={{ marginLeft: 5 }} /> : null
        )}
      </LoginBtnWrapper>
      {isRejected ? <ErrorMessage error={error} /> : null}
    </WelcomePageWrapper>
  )
}

export default LoginForm
