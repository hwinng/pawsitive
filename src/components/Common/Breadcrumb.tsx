import { Breadcrumb as AhaBreadcrumb } from '@ahaui/react'
import React from 'react'
import styled from 'styled-components'

import type { BreadcrumbItemm } from 'types/types'

const BreadcrumbWrapper = styled.div`
  margin-bottom: 1rem !important;
`
type BreadcrumnbProps = {
  items: BreadcrumbItemm[]
}
const CustomBreadcrumnb: React.FC<BreadcrumnbProps> = ({ items }) => {
  return (
    <BreadcrumbWrapper>
      <AhaBreadcrumb>
        {items.map((item: BreadcrumbItemm, index: number) => (
          <AhaBreadcrumb.Item href={item.href} key={index}>
            {item.name}
          </AhaBreadcrumb.Item>
        ))}
      </AhaBreadcrumb>
    </BreadcrumbWrapper>
  )
}

export default CustomBreadcrumnb
