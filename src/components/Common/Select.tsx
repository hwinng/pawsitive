import type { FieldValues, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

import type { Option } from '../../types/types'

const Select = styled.select`
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
`
type SelectFieldProps = {
  name: string
  label: string
  options: Array<Option>
  defaultValue?: Option
  register: UseFormRegister<FieldValues>
}
const SelectField: React.FC<SelectFieldProps> = ({
  register,
  options,
  name,
  label,
  defaultValue,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Select {...register(name)} {...rest}>
        {options.map((option) => (
          <option
            selected={defaultValue?.value === option.value}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default SelectField
