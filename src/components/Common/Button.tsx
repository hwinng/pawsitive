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
}
const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({ variant }: { variant: 'primary' | 'primary' }) => buttonVariants[variant]
)

export default Button
