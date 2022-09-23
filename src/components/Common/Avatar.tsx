import { Avatar } from '@ahaui/react'
import React from 'react'
import styled from 'styled-components'

const AvatarWrapper = styled.div<{ style?: any }>`
  ${(props) => {
    if (props.style) return props.style
  }}
`

type AvatarProps = {
  name?: string
  text?: string
  src?: string
  size?:
    | 'extraSmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'extraLarge'
    | 'extraLargePlus'
    | 'huge'
  alt?: string
  width?: number
  height?: number
  className?: string
  [props: string]: any
}
const CustomAvatar: React.FC<AvatarProps> = ({
  name,
  text,
  src,
  size = 'medium',
  alt = 'Avatar',
  width,
  height,
  className,
  ...props
}) => {
  return (
    <AvatarWrapper {...props}>
      <Avatar
        name={name}
        src={src}
        text={text}
        size={size}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </AvatarWrapper>
  )
}

export default CustomAvatar
