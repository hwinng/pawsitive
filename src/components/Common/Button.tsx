import styled from 'styled-components'

import * as colors from '../../constants/colors'

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
  danger: {
    background: colors.danger,
    color: colors.gray10,
  },
}

const Button = styled.button<{ variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 15px;
  border: 0;
  line-height: 1;
  border-radius: 3px;
  &:hover,
  :active {
    opacity: 0.7;
    cursor: pointer;
  }
  ${(props) => {
    return buttonVariants[props.variant]
  }}
`
export default Button
