import { Avatar as AhaAvatar } from '@ahaui/react'
import { faker } from '@faker-js/faker'
import React from 'react'
import styled, { css } from 'styled-components'

const AvatarWrapper = styled.div<{ style?: any }>`
  ${(props) => {
    if (props.style) return props.style
  }}
`

const DefaultAvatar = styled.div<{ css: any }>`
  ${(props) => {
    if (props.css)
      return css`
        ${props.css}
      `
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
  isDefault?: boolean
}
const Avatar: React.FC<AvatarProps> = ({
  name,
  text,
  src,
  size = 'medium',
  alt = 'Avatar',
  width = 32,
  height = 32,
  className = 'u-backgroundPrimaryLight u-text200',
  isDefault = false,
  ...props
}) => {
  if (isDefault) {
    return (
      <DefaultAvatar
        css={`
          width: ${width}px;
          height: ${height}px;
          border-radius: 50%;
          background-color: ${faker.color.rgb()};
        `}
      />
    )
  }

  if (typeof src === 'undefined') {
    return (
      <AhaAvatar
        text={text}
        name={name}
        size={size}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    )
  }
  return (
    <AvatarWrapper {...props}>
      <AhaAvatar
        name={name}
        src={src}
        size={size}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </AvatarWrapper>
  )
}

export default Avatar
