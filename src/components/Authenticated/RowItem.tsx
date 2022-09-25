import React from 'react'
import styled, { css } from 'styled-components'
import { Skeleton } from '@ahaui/react'

const RowInforWrapper = styled.div<{ disabled?: boolean }>`
  ${(props) => {
    if (props.disabled) {
      return css`
        font-weight: 800;
      `
    }
    return css`
      display: flex;
      justify-content: flex-start;
      gap: 2rem;
    `
  }}
`

const FieldText = styled.div`
  color: orange;
`

const ValueText = styled.div``

type RowItemProps = {
  field: string
  value: string | undefined
  mode?: 'view' | 'editing'
  type?: 'input' | 'dropdown'
  disabled?: boolean
}
const RowItem: React.FC<RowItemProps> = ({
  field,
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mode = 'view',
  disabled = false,
}) => {
  return (
    <RowInforWrapper disabled={disabled}>
      <FieldText>{field}:</FieldText>
      {mode === 'view' && <ViewContent value={value} />}
    </RowInforWrapper>
  )
}

const ViewContent = ({ value }: { value: string | undefined }) => {
  return value ? <ValueText>{value}</ValueText> : <Skeleton width={100} />
}

export default RowItem
