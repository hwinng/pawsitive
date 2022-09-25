import * as React from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input<{ hasError: boolean }>`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #dc3545;
      padding-right: calc(1.5em + 0.75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    `};
`

export const InputFieldError = styled.div<{ hasError: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      width: 100%;
      margin-top: 0.25rem;
      font-size: 80%;
      color: #dc3545;
    `}
`

type InputFieldProps = {
  name: string
  label: string
  register?: any
  type?: HTMLInputTypeAttribute
  error?: any
  defaultValue?: string
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  defaultValue,
  register,
  type,
  error,
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Input
      id={name}
      name={name}
      type={type}
      {...register(name)}
      hasError={!!error}
      defaultValue={defaultValue}
    ></Input>
    <InputFieldError hasError={!!error}>{error}</InputFieldError>
  </div>
)

export default InputField
