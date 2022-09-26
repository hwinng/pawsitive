import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { px2vw } from 'utils/px2vw'

type FormProps = {
  defaultValues?: any
  onSubmit: (data: any) => void
  children: JSX.Element | JSX.Element[]
}
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  width: ${px2vw(75, 100)};
  height: 100%;

  @media (min-width: 768px) {
    width: ${px2vw(300, 768)};
    min-height: ${px2vw(200, 768)};
  }

  @media (min-width: 1024px) {
    width: ${px2vw(350)};
    min-height: ${px2vw(300)};
  }

  @media (min-width: 1440px) {
    width: ${px2vw(200)};
    min-height: ${px2vw(150)};
  }
`

export default function Form({
  defaultValues,
  children,
  onSubmit,
}: FormProps): JSX.Element {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </form>
  )
}
