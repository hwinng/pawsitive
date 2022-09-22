import React from 'react'
import styled from 'styled-components'

import { useAuth } from '../../hooks/useAuth'
import Button from '../Common/Button'
import { Logo } from '../Common/Logo'

import LoginForm from './LoginForm'

const WelcomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100vh;
  margin-top: 2rem;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`

const LogoWrapper = styled.div``

const UnAuthenticatedApp = () => {
  const { login } = useAuth()
  return (
    <WelcomePageWrapper>
      <LogoWrapper>
        <Logo />
        <Title>Pawsitive</Title>
      </LogoWrapper>
      <LoginForm
        onSubmit={login}
        submitButton={<Button variant="primary">Login</Button>}
      />
    </WelcomePageWrapper>
  )
}

export default UnAuthenticatedApp
