import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'

import { useAsync } from '../../hooks/useAsync'
import type { LoginFormVm } from '../../types/types'
import ErrorMessage from '../Common/ErrorMessage'
import { FormWrapper } from '../Common/Form'
import InputField from '../Common/InputField'
import Spinner from '../Common/Spinner'
const LoginBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const LoginForm: React.FC<{
  onSubmit: (body: LoginFormVm) => Promise<void>
  submitButton: React.ReactElement
}> = ({ submitButton, onSubmit: _login }) => {
  const { isPending, isRejected, error, run } = useAsync()

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    username: Yup.string()
      .max(10, 'Username must be maximum 10 characters')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data: FieldValues) {
    run(
      _login({
        username: data.username,
        firstName: data.firstName,
        password: data.password,
      })
    )
    return false
  }

  return (
    <FormWrapper id="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="firstName"
        label="First Name"
        type="text"
        register={register}
        error={errors.firstName?.message}
      />
      <InputField
        name="username"
        label="Username"
        type="text"
        register={register}
        error={errors.username?.message}
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <LoginBtnWrapper>
        {React.cloneElement(
          submitButton,
          { type: 'submit', form: 'loginForm' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isPending ? <Spinner style={{ marginLeft: 5 }} /> : null
        )}
      </LoginBtnWrapper>
      {isRejected ? <ErrorMessage error={error} /> : null}
    </FormWrapper>
  )
}

export default LoginForm
